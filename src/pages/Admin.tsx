import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import { Link } from 'react-router'
import { ArrowLeft, Mail, MessageSquare, Calendar, Apple, Smartphone, ShieldCheck } from 'lucide-react'

export default function Admin() {
  const navigate = useNavigate()
  const { user, isLoading, logout } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/')
    }
  }, [user, isLoading, navigate])

  const contactStats = trpc.contact.stats.useQuery(undefined, { enabled: user?.role === 'admin' })
  const demoStats = trpc.demo.stats.useQuery(undefined, { enabled: user?.role === 'admin' })
  const subscribers = trpc.newsletter.list.useQuery(undefined, { enabled: user?.role === 'admin' })
  const contacts = trpc.contact.list.useQuery({ limit: 10 }, { enabled: user?.role === 'admin' })
  const demos = trpc.demo.list.useQuery({ limit: 10 }, { enabled: user?.role === 'admin' })

  const updateContactStatus = trpc.contact.updateStatus.useMutation({
    onSuccess: () => {
      contacts.refetch()
      contactStats.refetch()
    },
  })

  const updateDemoStatus = trpc.demo.updateStatus.useMutation({
    onSuccess: () => {
      demos.refetch()
      demoStats.refetch()
    },
  })

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
            This area is restricted to system administrators. Your account (<strong>{user?.name || 'User'}</strong>) 
            is currently assigned the <strong>{user?.role || 'user'}</strong> role.
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
          <p className="mt-8 text-[10px] text-[#64748B] uppercase tracking-widest font-bold">
            Security ID: {user?.id || 'ANONYMOUS'}
          </p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      label: 'Contact Submissions',
      value: contactStats.data?.total ?? 0,
      sub: `${contactStats.data?.new ?? 0} new`,
      icon: MessageSquare,
      color: '#3A7BFF',
    },
    {
      label: 'Demo Requests',
      value: demoStats.data?.total ?? 0,
      sub: `${demoStats.data?.pending ?? 0} pending`,
      icon: Calendar,
      color: '#17B7BD',
    },
    {
      label: 'Android Waitlist',
      value: subscribers.data?.filter(s => s.source === 'android_waitlist').length ?? 0,
      sub: 'Beta users',
      icon: Smartphone,
      color: '#00D084',
    },
    {
      label: 'iOS Waitlist',
      value: subscribers.data?.filter(s => s.source === 'ios_waitlist').length ?? 0,
      sub: 'Early birds',
      icon: Apple,
      color: '#F59E0B',
    },
  ]

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#05070F', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <Link
            to="/"
            style={{
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94A3B8' }}
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF' }}>
            Admin Dashboard
          </h1>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                style={{
                  background: '#0A0F2C',
                  border: '1px solid rgba(58, 123, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </span>
                  <Icon size={18} color={stat.color} />
                </div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: stat.color, marginTop: '4px' }}>
                  {stat.sub}
                </div>
              </div>
            )
          })}
        </div>

        {/* App Waitlists Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Android Waitlist */}
          <div style={{ background: '#0A0F2C', border: '1px solid rgba(58, 123, 255, 0.15)', borderRadius: '12px', padding: '24px', overflowX: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Smartphone size={20} className="text-[#00D084]" /> Android Waitlist
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(58, 123, 255, 0.15)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', color: '#64748B' }}>EMAIL</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', color: '#64748B' }}>DATE</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.data?.filter(s => s.source === 'android_waitlist').map(s => (
                  <tr key={s.id}>
                    <td style={{ padding: '12px 8px', fontSize: '13px', color: 'white' }}>{s.email}</td>
                    <td style={{ padding: '12px 8px', fontSize: '12px', color: '#64748B' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* iOS Waitlist */}
          <div style={{ background: '#0A0F2C', border: '1px solid rgba(58, 123, 255, 0.15)', borderRadius: '12px', padding: '24px', overflowX: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Apple size={20} className="text-[#F59E0B]" /> iOS Waitlist
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(58, 123, 255, 0.15)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', color: '#64748B' }}>EMAIL</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', color: '#64748B' }}>DATE</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.data?.filter(s => s.source === 'ios_waitlist').map(s => (
                  <tr key={s.id}>
                    <td style={{ padding: '12px 8px', fontSize: '13px', color: 'white' }}>{s.email}</td>
                    <td style={{ padding: '12px 8px', fontSize: '12px', color: '#64748B' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Newsletter Section */}
        <div style={{ background: '#0A0F2C', border: '1px solid rgba(58, 123, 255, 0.15)', borderRadius: '12px', padding: '24px', marginBottom: '24px', overflowX: 'auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={20} className="text-[#3A7BFF]" /> Newsletter Subscribers
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(58, 123, 255, 0.15)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontSize: '11px', color: '#64748B' }}>EMAIL</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', color: '#64748B' }}>NAME</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', color: '#64748B' }}>SOURCE</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', color: '#64748B' }}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.data?.filter(s => !s.source?.includes('waitlist')).map(s => (
                <tr key={s.id}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: 'white' }}>{s.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{s.name || '-'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748B' }}>{s.source}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748B' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact Submissions Table */}
        <div
          style={{
            background: '#0A0F2C',
            border: '1px solid rgba(58, 123, 255, 0.15)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            overflowX: 'auto',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '20px' }}>
            Recent Contact Submissions
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Company', 'Subject', 'Message', 'Status', 'Date', 'Action'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: '#64748B',
                      borderBottom: '1px solid rgba(58, 123, 255, 0.15)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts.data?.map((contact) => (
                <tr key={contact.id}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#FFFFFF' }}>{contact.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{contact.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{contact.company || '-'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{contact.subject}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748B', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={contact.message}>
                    {contact.message}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        padding: '4px 10px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        ...(contact.status === 'new'
                          ? { background: 'rgba(58, 123, 255, 0.15)', color: '#3A7BFF' }
                          : contact.status === 'in_progress'
                          ? { background: 'rgba(23, 183, 189, 0.15)', color: '#17B7BD' }
                          : { background: 'rgba(0, 208, 132, 0.15)', color: '#00D084' }),
                      }}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={contact.status}
                      onChange={(e) =>
                        updateContactStatus.mutate({ id: contact.id, status: e.target.value as 'new' | 'in_progress' | 'resolved' })
                      }
                      style={{
                        background: '#0F1629',
                        border: '1px solid rgba(58, 123, 255, 0.2)',
                        borderRadius: '4px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
              {(!contacts.data || contacts.data.length === 0) && (
                <tr>
                  <td colSpan={6} style={{ padding: '24px 16px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
                    No contact submissions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Demo Requests Table */}
        <div
          style={{
            background: '#0A0F2C',
            border: '1px solid rgba(58, 123, 255, 0.15)',
            borderRadius: '12px',
            padding: '24px',
            overflowX: 'auto',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '20px' }}>
            Recent Demo Requests
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Company', 'Phone', 'Type', 'Message', 'Status', 'Date', 'Action'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: '#64748B',
                      borderBottom: '1px solid rgba(58, 123, 255, 0.15)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demos.data?.map((demo) => (
                <tr key={demo.id}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#FFFFFF' }}>{demo.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{demo.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{demo.company || '-'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{demo.phone || '-'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{demo.traderType || '-'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748B', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={demo.message || ''}>
                    {demo.message || '-'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        padding: '4px 10px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        ...(demo.status === 'pending'
                          ? { background: 'rgba(255, 193, 7, 0.15)', color: '#FFC107' }
                          : demo.status === 'scheduled'
                          ? { background: 'rgba(58, 123, 255, 0.15)', color: '#3A7BFF' }
                          : demo.status === 'completed'
                          ? { background: 'rgba(0, 208, 132, 0.15)', color: '#00D084' }
                          : { background: 'rgba(255, 71, 87, 0.15)', color: '#FF4757' }),
                      }}
                    >
                      {demo.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                    {new Date(demo.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={demo.status}
                      onChange={(e) =>
                        updateDemoStatus.mutate({
                          id: demo.id,
                          status: e.target.value as 'pending' | 'scheduled' | 'completed' | 'cancelled',
                        })
                      }
                      style={{
                        background: '#0F1629',
                        border: '1px solid rgba(58, 123, 255, 0.2)',
                        borderRadius: '4px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {(!demos.data || demos.data.length === 0) && (
                <tr>
                  <td colSpan={9} style={{ padding: '24px 16px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
                    No demo requests yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
