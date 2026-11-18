'use client';
import { useState } from 'react';
import { Arrow } from './arrow';
export function Navigation() {
 const [open,setOpen]=useState(false);
 return <header className="header"><div className="shell header-inner"><a className="brand" href="#intro" aria-label="Julian Becaj home">jb<span> / portfolio</span></a><button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'Close −':'Menu +'}</button><nav id="navigation" className={open?'is-open':''} aria-label="Main navigation">{[['Work','projects'],['About','about'],['Experience','experience'],['Contact','contact']].map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}</a>)}</nav><a className="header-contact" href="mailto:julian.becaj16@gmail.com">Let’s talk <Arrow /></a></div></header>
}
export function CopyEmail(){const [status,setStatus]=useState('Copy email');return <button className="copy-email" onClick={async()=>{try{await navigator.clipboard.writeText('julian.becaj16@gmail.com');setStatus('Email copied ✓')}catch{setStatus('Select the email address to copy')}}}><span aria-live="polite">{status}</span></button>}

