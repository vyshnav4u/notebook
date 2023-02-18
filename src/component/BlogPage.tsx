import React from 'react'
import "./BlogPage.css"
import MainContext from './MainContext';

const LEFT_SIDEBAR_WIDTH = 25;
const RIGHT_SIDEBAR_WIDTH = 25;
const CONTENT_WIDTH = 50;

const colorPalette = {
	primary: '#bb86fc',
	secondary: '#03dac5',
	background: '#121212',
	secondaryBackground: '#1e1e1e',
	font: '#e1e1e1'
}

const containerStyle:React.CSSProperties = {background: colorPalette.background};
const sidebarStyle:React.CSSProperties = {background: colorPalette.secondaryBackground};

const BlogPage = () => {
  return (
    <div className='blog-page' style={containerStyle}>
        <aside className='left-sidebar' style={sidebarStyle}> Left</aside>
        <main className='main'> <MainContext /> </main>
        <aside className='right-sidebar' style={sidebarStyle}> Right </aside>
    </div>
  )
}

export default BlogPage