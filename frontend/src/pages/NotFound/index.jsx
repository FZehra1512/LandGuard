import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg mt-2">Page not found</p>
      <Button asChild className="mt-6">
        <Link to="/">
            Go Home
        </Link>
      </Button>
    </div>
  )
}

export default NotFound
