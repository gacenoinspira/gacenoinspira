'use client'

import Link from 'next/link';
import React, { ComponentPropsWithRef } from 'react';
import LoadingIndicator from './ui-indicador-loading-link';
import { usePathname } from 'next/navigation';


 interface Props extends ComponentPropsWithRef<typeof Link> {
    namePath:string;
    classActive?:string;
 } 

export function UiLink ({namePath,  href, classActive, className, ...props}:Props) {
    const pathname = usePathname()
    const isActive = pathname === href;
  return (
    <Link href={href} {...props} className={`${className} ${isActive ? classActive : ''}`}>
        {namePath} 
        <LoadingIndicator/>
    </Link>
  );
};
