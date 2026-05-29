// ... existing imports ...
import { Toaster, toast } from 'sonner';

export default function Admin() {
  // ... existing hooks ...
  const changePasswordMutation = trpc.auth.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setChangePasswordData({ currentPassword: "", newPassword: "" });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const [changePasswordData, setChangePasswordData] = useState({ currentPassword: "", newPassword: "" });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    changePasswordMutation.mutate(changePasswordData);
  };

  // ... (keep the rest of the component up to the layout) ...

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#05070F', padding: '24px' }}>
      <Toaster position="top-right" theme="dark" />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* ... existing header ... */}

        {/* New Password Change Card */}
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

        {/* ... existing statCards ... */}
        {/* ... rest of the component ... */}
      </div>
    </div>
  );
}

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
