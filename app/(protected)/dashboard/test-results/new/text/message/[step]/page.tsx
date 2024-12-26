
import LabStepper from '@/app/component/ui/LabStepper'
import React from 'react'

function General() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
       
    <div className='mt-10'>
    <LabStepper basePath='/dashboard/test-results/new/text/message'/>
    </div>
  
    </div>
  )
}

export default General