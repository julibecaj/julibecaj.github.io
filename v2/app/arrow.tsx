export function Arrow({ direction = 'external' }: { direction?: 'external' | 'down' | 'up' }) {
  return <svg className={`arrow arrow--${direction}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}
