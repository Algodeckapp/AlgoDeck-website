import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import { Link } from 'react-router'
import { ArrowLeft, MessageSquare, Calendar, Apple, Smartphone, ShieldCheck, Users, Mail } from 'lucide-react'
import { Toaster, toast } from 'sonner';

export default function Admin() {
  const navigate = useNavigate()
  const { user, isLoading, logout } = useAuth()
  const [changePasswordData, setChangePasswordData] = useState({ currentPassword: "", newPassword: "" });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/')
    }
  }, [user, isLoading, navigate])

  const changePasswordMutation = trpc.auth.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setChangePasswordData({ currentPassword: "", newPassword: "" });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    changePasswordMutation.mutate(changePasswordData);
  };

  const contactStats = trpc.contact.stats.useQuery(undefined, { enabled: user?.role === 'admin' })
  const contactList = trpc.contact.list.useQuery(undefined, { enabled: user?.role === 'admin' })
  const demoStats = trpc.demo.stats.useQuery(undefined, { enabled: user?.role === 'admin' })
  const demoList = trpc.demo.list.useQuery(undefined, { enabled: user?.role === 'admin' })
  const subscribers = trpc.newsletter.list.useQuery(undefined, { enabled: user?.role === 'admin' })
  
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#05070F' }}>
        <div style={{ color: '#3A7BFF', fontSize: '14px' }}>Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#05070F] flex items-center justify-center px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-md w-full glass-panel p-10 border-white/5 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 text-red-500">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            This area is restricted to system administrators.
          </p>
          <div className="space-y-4">
            <Link to="/" className="glow-button !w-full block">Return Home</Link>
            <button 
              onClick={() => logout()}
              className="outline-button !w-full"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  const subscriberList = (subscribers.data as any[]) || []
  const contactInquiries = (contactList.data as any[]) || []
  const demoRequests = (demoList.data as any[]) || []
  
  const statCards = [
    { label: 'Total Contacts', value: contactStats.data?.total ?? 0, icon: MessageSquare, color: '#3A7BFF' },
    { label: 'New Inquiries', value: contactStats.data?.new ?? 0, icon: MessageSquare, color: '#00D084' },
    { label: 'Demo Requests', value: demoStats.data?.total ?? 0, icon: Calendar, color: '#17B7BD' },
    { label: 'Pending Demos', value: demoStats.data?.pending ?? 0, icon: Calendar, color: '#F59E0B' },
    { label: 'Total Subscribers', value: subscriberList.length, icon: Users, color: '#8B5CF6' },
    { label: 'Android Waitlist', value: subscriberList.filter(s => s.source === 'android_waitlist').length, icon: Smartphone, color: '#00D084' },
    { label: 'iOS Waitlist', value: subscriberList.filter(s => s.source === 'ios_waitlist').length, icon: Apple, color: '#F59E0B' },
    { label: 'Newsletter', value: subscriberList.filter(s => s.source === 'footer').length, icon: Mail, color: '#3A7BFF' },
  ]

  const tableHeaderStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748B',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  }

  const tableCellStyle: React.CSSProperties = {
    padding: '16px',
    fontSize: '13px',
    color: '#E2E8F0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#05070F', padding: '24px' }}>
      <Toaster position="top-right" theme="dark" />
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <Link to="/" style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <ArrowLeft size={20} />
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF' }}>Admin Dashboard</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: '#0A0F2C', border: '1px solid rgba(58, 123, 255, 0.15)', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '20px' }}>Change Password</h2>
            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', color: '#64748B' }}>Current Password</label>
                <input type="password" value={changePasswordData.currentPassword} onChange={(e) => setChangePasswordData({...changePasswordData, currentPassword: e.target.value})} required style={{ background: '#0F1629', border: '1px solid rgba(58, 123, 255, 0.2)', padding: '10px 12px', borderRadius: '6px', color: 'white', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', color: '#64748B' }}>New Password</label>
                <input type="password" value={changePasswordData.newPassword} onChange={(e) => setChangePasswordData({...changePasswordData, newPassword: e.target.value})} required style={{ background: '#0F1629', border: '1px solid rgba(58, 123, 255, 0.2)', padding: '10px 12px', borderRadius: '6px', color: 'white', outline: 'none' }} />
              </div>
              <button type="submit" disabled={changePasswordMutation.isPending} style={{ background: '#3A7BFF', color: 'white', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, border: 'none', marginTop: '8px' }}>
                {changePasswordMutation.isPending ? "Changing..." : "Update Password"}
              </button>
            </form>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {statCards.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} style={{ background: '#0A0F2C', border: '1px solid rgba(58, 123, 255, 0.15)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
                    <Icon size={16} color={stat.color} />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF' }}>{stat.value}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tables Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Contact Inquiries Table */}
          <div style={{ background: '#0A0F2C', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>Contact Inquiries</h3>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Emails are sent directly to admin@algodeck.app</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={tableHeaderStyle}>Subject</th>
                    <th style={tableHeaderStyle}>Company</th>
                    <th style={tableHeaderStyle}>Message Snippet</th>
                  </tr>
                </thead>
                <tbody>
                  {contactInquiries.length > 0 ? contactInquiries.map((item, i) => (
                    <tr key={i}>
                      <td style={tableCellStyle}>{item.name}</td>
                      <td style={tableCellStyle}>{item.email}</td>
                      <td style={tableCellStyle}>{item.subject}</td>
                      <td style={tableCellStyle}>{item.company || '-'}</td>
                      <td style={tableCellStyle}>{item.message?.substring(0, 50)}...</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} style={{ ...tableCellStyle, textAlign: 'center', color: '#64748B', padding: '40px' }}>No inquiries found in direct-mapping mode. Check admin email for logs.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Demo Requests Table */}
          <div style={{ background: '#0A0F2C', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>Demo Requests</h3>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Requests are routed directly to sales email</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={tableHeaderStyle}>Phone</th>
                    <th style={tableHeaderStyle}>Type</th>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {demoRequests.length > 0 ? demoRequests.map((item, i) => (
                    <tr key={i}>
                      <td style={tableCellStyle}>{item.name}</td>
                      <td style={tableCellStyle}>{item.email}</td>
                      <td style={tableCellStyle}>{item.phone || '-'}</td>
                      <td style={tableCellStyle}>{item.traderType}</td>
                      <td style={tableCellStyle}>{item.preferredDate || '-'}</td>
                      <td style={tableCellStyle}>{item.message?.substring(0, 30)}...</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} style={{ ...tableCellStyle, textAlign: 'center', color: '#64748B', padding: '40px' }}>No demo requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Newsletter Subscribers Table */}
          <div style={{ background: '#0A0F2C', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>Newsletter Subscribers</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={tableHeaderStyle}>Source</th>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriberList.length > 0 ? subscriberList.map((item, i) => (
                    <tr key={i}>
                      <td style={tableCellStyle}>{item.email}</td>
                      <td style={tableCellStyle}>{item.source}</td>
                      <td style={tableCellStyle}>{item.name || '-'}</td>
                      <td style={tableCellStyle}>
                        <span style={{ padding: '4px 8px', background: 'rgba(0, 208, 132, 0.1)', color: '#00D084', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Active</span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} style={{ ...tableCellStyle, textAlign: 'center', color: '#64748B', padding: '40px' }}>No subscribers found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
