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
      className={`flex items-center gap-2 px-8 md:px-12 ${
        index < stats.length - 1 ? 'border-r border-[#3A7BFF]/15' : ''
      } whitespace-nowrap`}
    >
      <span
        className="font-mono text-lg md:text-xl font-bold"
        style={{ color: stat.color }}
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
      <span className="text-[10px] md:text-xs tracking-wider text-[#64748B] uppercase">
        {stat.label}
      </span>
    </div>
  )
}

export default function StatsMarquee() {
  return (
    <section className="w-full bg-[#0A0F2C] border-t border-b border-[#3A7BFF]/15 py-4 md:py-6 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {/* Duplicate for seamless loop */}
        {[...stats, ...stats].map((stat, index) => (
          <StatBlock key={`${stat.label}-${index}`} stat={stat} index={index % stats.length} />
        ))}
      </div>
    </section>
  )
}
