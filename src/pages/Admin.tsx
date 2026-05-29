import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import { Link } from 'react-router'
import { ArrowLeft, MessageSquare, Calendar, Apple, Smartphone, ShieldCheck } from 'lucide-react'
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
  const demoStats = trpc.demo.stats.useQuery(undefined, { enabled: user?.role === 'admin' })
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

  const statCards = [
    { label: 'Contact Submissions', value: contactStats.data?.total ?? 0, icon: MessageSquare, color: '#3A7BFF' },
    { label: 'Demo Requests', value: demoStats.data?.total ?? 0, icon: Calendar, color: '#17B7BD' },
    { label: 'Android Waitlist', value: subscribers.data?.filter(s => s.source === 'android_waitlist').length ?? 0, icon: Smartphone, color: '#00D084' },
    { label: 'iOS Waitlist', value: subscribers.data?.filter(s => s.source === 'ios_waitlist').length ?? 0, icon: Apple, color: '#F59E0B' },
  ]

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#05070F', padding: '24px' }}>
      <Toaster position="top-right" theme="dark" />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <Link to="/" style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <ArrowLeft size={20} />
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF' }}>Admin Dashboard</h1>
        </div>

        <div style={{ background: '#0A0F2C', border: '1px solid rgba(58, 123, 255, 0.15)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '20px' }}>Change Password</h2>
          <form onSubmit={handleChangePassword} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#64748B' }}>Current Password</label>
              <input type="password" value={changePasswordData.currentPassword} onChange={(e) => setChangePasswordData({...changePasswordData, currentPassword: e.target.value})} required style={{ background: '#0F1629', border: '1px solid rgba(58, 123, 255, 0.2)', padding: '8px 12px', borderRadius: '6px', color: 'white' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#64748B' }}>New Password</label>
              <input type="password" value={changePasswordData.newPassword} onChange={(e) => setChangePasswordData({...changePasswordData, newPassword: e.target.value})} required style={{ background: '#0F1629', border: '1px solid rgba(58, 123, 255, 0.2)', padding: '8px 12px', borderRadius: '6px', color: 'white' }} />
            </div>
            <button type="submit" disabled={changePasswordMutation.isPending} style={{ background: '#3A7BFF', color: 'white', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
              {changePasswordMutation.isPending ? "Changing..." : "Update"}
            </button>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} style={{ background: '#0A0F2C', border: '1px solid rgba(58, 123, 255, 0.15)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase' }}>{stat.label}</span>
                  <Icon size={18} color={stat.color} />
                </div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF' }}>{stat.value}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
