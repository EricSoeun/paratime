import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Header } from '../components/Header'
import { TimeForm } from '../components/TimeForm'
import { TimeList } from '../components/TimeList'
import { timezones } from '../utils/timezones'

export const Route = createLazyFileRoute('/')({
  component: App,
})

function App() {
  const [sourceDateTime, setSourceDateTime] = useState<Date>(new Date())
  const [sourceTimezone, setSourceTimezone] = useState<string>(timezones[0].timezone)

  const handleTimeChange = (dateTime: Date, timezone: string): void => {
    setSourceDateTime(dateTime)
    setSourceTimezone(timezone)
    console.log('App State Updated:', dateTime, timezone)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <TimeForm onTimeChange={handleTimeChange} />
          </div>
          <div className="w-full md:w-1/2">
            <TimeList sourceUtcDate={sourceDateTime} sourceTimezone={sourceTimezone} />
          </div>
        </div>
      </main>
    </div>
  )
}
