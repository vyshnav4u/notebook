import React from 'react'
import { MinatoImage } from '../assets/images/minato';
import "./BlogPage.css"
import MainContext from './MainContext';
import PhotoViewer from './photoviewer/PhotoViewer';

const LEFT_SIDEBAR_WIDTH = 25;
const RIGHT_SIDEBAR_WIDTH = 25;
const CONTENT_WIDTH = 50;

const colorPalette = {
	primary: '#bb86fc',
	secondary: '#03dac5',
	// background: '#121212',
	background: '#fff',
	secondaryBackground: '#1e1e1e',
	font: '#e1e1e1'
}

const containerStyle:React.CSSProperties = {background: colorPalette.background};
const sidebarStyle:React.CSSProperties = {background: colorPalette.secondaryBackground};

const BlogPage = () => {
  return (
    <div className='blog-page' style={containerStyle}>
        <aside className='left-sidebar' style={sidebarStyle}> Left</aside>
        <main className='main'> <MainContext /> 
        <PhotoViewer src={MinatoImage} />         
        </main>
        <aside className='right-sidebar' style={sidebarStyle}> Right </aside>
    </div>
  )
}

export default BlogPage