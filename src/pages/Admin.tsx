import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import { Link } from 'react-router'
import { ArrowLeft, Mail, MessageSquare, Calendar } from 'lucide-react'

export default function Admin() {
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/')
    }
  }, [user, isLoading, navigate])

  const contactStats = trpc.contact.stats.useQuery(undefined, { enabled: user?.role === 'admin' })
  const demoStats = trpc.demo.stats.useQuery(undefined, { enabled: user?.role === 'admin' })
  const subscriberCount = trpc.newsletter.count.useQuery(undefined, { enabled: user?.role === 'admin' })
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
    return null
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
      label: 'Newsletter Subscribers',
      value: subscriberCount.data?.total ?? 0,
      sub: `${subscriberCount.data?.active ?? 0} active`,
      icon: Mail,
      color: '#00D084',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#05070F', padding: '24px' }}>
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
                {['Name', 'Email', 'Subject', 'Status', 'Date', 'Action'].map((h) => (
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
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{contact.subject}</td>
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
                {['Name', 'Email', 'Company', 'Type', 'Status', 'Date', 'Action'].map((h) => (
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
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8' }}>{demo.traderType || '-'}</td>
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
                  <td colSpan={7} style={{ padding: '24px 16px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
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
