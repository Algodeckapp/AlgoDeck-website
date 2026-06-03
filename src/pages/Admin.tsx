import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import { Link } from 'react-router'
import { ArrowLeft, MessageSquare, Calendar, Apple, Smartphone, ShieldCheck, Users, Mail } from 'lucide-react'
import { Toaster } from 'sonner';

export default function Admin() {
  const navigate = useNavigate()
  const { user, isLoading, logout } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/')
    }
  }, [user, isLoading, navigate])

  const contactStats = trpc.contact.stats.useQuery(undefined, { enabled: user?.role === 'admin' })
  const contactList = trpc.contact.list.useQuery(undefined, { enabled: user?.role === 'admin' })
  const demoStats = trpc.demo.stats.useQuery(undefined, { enabled: user?.role === 'admin' })
  const demoList = trpc.demo.list.useQuery(undefined, { enabled: user?.role === 'admin' })
  const subscribers = trpc.newsletter.list.useQuery(undefined, { enabled: user?.role === 'admin' })
  const ping = trpc.ping.useQuery(undefined, { enabled: user?.role === 'admin' })
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05070F]">
        <div className="text-[#3A7BFF] text-sm animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#05070F] flex items-center justify-center px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
        <div className="max-w-md w-full glass-panel p-8 md:p-10 border-white/5 text-center relative z-10">
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

  return (
    <div className="relative min-h-screen bg-[#05070F] p-4 md:p-6 lg:p-8">
      <Toaster position="top-right" theme="dark" />
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-[#94A3B8] hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>

          {/* Database Health Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${ping.data?.storage.connected ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'} text-[10px] font-bold uppercase tracking-wider transition-all`}>
            <div className={`w-1.5 h-1.5 rounded-full ${ping.data?.storage.connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            DB Status: {ping.data?.storage.type === 'redis' ? 'Live (Redis)' : 'Local (JSON)'}
          </div>
        </div>

        <div className="mb-10">
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-[#0A0F2C] border border-[#3A7BFF]/15 rounded-xl p-5 flex flex-col justify-between hover:border-[#3A7BFF]/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] md:text-xs text-[#94A3B8] font-bold uppercase tracking-widest">{stat.label}</span>
                    <Icon size={16} color={stat.color} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tables Section */}
        <div className="flex flex-col gap-8">
          
          {/* Contact Inquiries Table */}
          <div className="bg-[#0A0F2C] border border-white/5 rounded-xl overflow-hidden">
            <div className="p-5 md:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h3 className="text-lg font-semibold text-white">Contact Inquiries</h3>
              <span className="text-[10px] md:text-xs text-[#64748B] font-medium uppercase tracking-wider">Direct mapping enabled</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Name</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Email</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Subject</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Company</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {contactInquiries.length > 0 ? contactInquiries.map((item, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-sm text-white font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-[#94A3B8]">{item.email}</td>
                      <td className="px-6 py-4 text-sm text-[#3A7BFF] uppercase tracking-tighter font-bold">{item.subject}</td>
                      <td className="px-6 py-4 text-sm text-[#94A3B8]">{item.company || '-'}</td>
                      <td className="px-6 py-4 text-sm text-[#64748B] italic max-w-xs truncate">{item.message}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center text-sm text-[#64748B]">No inquiries found. Check admin email for logs.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Demo Requests Table */}
          <div className="bg-[#0A0F2C] border border-white/5 rounded-xl overflow-hidden">
            <div className="p-5 md:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h3 className="text-lg font-semibold text-white">Demo Requests</h3>
              <span className="text-[10px] md:text-xs text-[#64748B] font-medium uppercase tracking-wider">Sales routing active</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Name</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Email</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Phone</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Type</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Date</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {demoRequests.length > 0 ? demoRequests.map((item, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-sm text-white font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-[#94A3B8]">{item.email}</td>
                      <td className="px-6 py-4 text-sm text-[#94A3B8]">{item.phone || '-'}</td>
                      <td className="px-6 py-4 text-sm text-[#17B7BD] font-semibold">{item.traderType}</td>
                      <td className="px-6 py-4 text-sm text-white">{item.preferredDate || '-'}</td>
                      <td className="px-6 py-4 text-sm text-[#64748B] italic max-w-xs truncate">{item.message}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-sm text-[#64748B]">No demo requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Newsletter Subscribers Table */}
          <div className="bg-[#0A0F2C] border border-white/5 rounded-xl overflow-hidden">
            <div className="p-5 md:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h3 className="text-lg font-semibold text-white">Newsletter Subscribers</h3>
              <span className="text-[10px] md:text-xs text-[#64748B] font-medium uppercase tracking-wider">Active audience</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Email</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Source</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Name</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-widest border-b border-white/5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {subscriberList.length > 0 ? subscriberList.map((item, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-sm text-white font-medium">{item.email}</td>
                      <td className="px-6 py-4 text-sm text-[#3A7BFF]">{item.source}</td>
                      <td className="px-6 py-4 text-sm text-[#94A3B8]">{item.name || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex px-2 py-1 bg-green-500/10 text-green-500 rounded text-[10px] font-bold uppercase tracking-wider">Active</span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center text-sm text-[#64748B]">No subscribers found.</td>
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
