import React from 'react'

import './css/gridview.css'
export default function GridView({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="grid_view">
      {children}
      <span className="grid_view_end">
        <i className="fa-solid fa-atom" style={{ fontSize: '14pt' }}></i>
      </span>
    </div>
  )
}
