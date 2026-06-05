export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <div style={{ paddingTop: 80, paddingBottom: 48 }}>
      {eyebrow && (
        <p style={{
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#18b4d4',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#18b4d4', display: 'inline-block'
          }} />
          {eyebrow}
        </p>
      )}
      <h1 style={{
        fontSize: 56,
        fontWeight: 800,
        color: '#ffffff',
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        marginBottom: subtitle ? 20 : 0,
        maxWidth: 800
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{
          fontSize: 17,
          color: '#9ca3af',
          maxWidth: 560,
          lineHeight: 1.6,
          marginBottom: children ? 24 : 0
        }}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}
