import React from 'react'

import './css/gridview.css'
export default function GridView({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="grid_view">
      {children}
      <span className="grid_view_end">END</span>
    </div>
  )
}
