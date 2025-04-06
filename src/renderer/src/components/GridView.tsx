import React from 'react'

export default function GridView({ children }: { children: React.ReactNode }): JSX.Element {
  const styleGridView: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(20vw, 300px))',
    gap: '2pt',
    boxSizing: 'border-box',
    width: '100%',
    maxHeight: '100vh',
    overflowY: 'scroll',
    paddingTop: '2pt',
    paddingBottom: '5vh'
  }
  const styleEnd: React.CSSProperties = {
    gridColumn: '1 / -1',
    textAlign: 'center',
    marginBlock: '1vh'
  }
  return (
    <div className="grid_view" style={styleGridView}>
      {children}
      <h5 style={styleEnd}>END</h5>
    </div>
  )
}
