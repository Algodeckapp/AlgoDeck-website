import CountUp from 'react-countup'
import { useInView } from '@/hooks/useInView'

const stats = [
  { value: 10000, suffix: '+', prefix: '', label: 'Active Bots', color: '#3A7BFF' },
  { value: 50, suffix: 'M+', prefix: '', label: 'Trades Executed', color: '#17B7BD' },
  { value: 4.8, suffix: '', prefix: '', label: 'Average Rating', color: '#00D084' },
  { value: 100, suffix: 'M+', prefix: '$', label: 'Trading Volume', color: '#3A7BFF' },
]

function StatBlock({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const isDecimal = stat.value % 1 !== 0

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 48px',
        borderRight: index < stats.length - 1 ? '1px solid rgba(58, 123, 255, 0.15)' : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '20px',
          fontWeight: 700,
          color: stat.color,
        }}
      >
        {stat.prefix}
        {inView ? (
          <CountUp
            end={stat.value}
            decimals={isDecimal ? 1 : 0}
            duration={2.5}
            separator=","
          />
        ) : (
          '0'
        )}
        {stat.suffix}
      </span>
      <span style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#64748B', textTransform: 'uppercase' }}>
        {stat.label}
      </span>
    </div>
  )
}

export default function StatsMarquee() {
  return (
    <section
      style={{
        width: '100%',
        background: '#0A0F2C',
        borderTop: '1px solid rgba(58, 123, 255, 0.15)',
        borderBottom: '1px solid rgba(58, 123, 255, 0.15)',
        padding: '20px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = 'running'
        }}
      >
        {/* Duplicate for seamless loop */}
        {[...stats, ...stats].map((stat, index) => (
          <StatBlock key={`${stat.label}-${index}`} stat={stat} index={index % stats.length} />
        ))}
      </div>
    </section>
  )
}
