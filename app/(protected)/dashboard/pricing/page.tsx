'use client'

import { Button as AntButton } from 'antd' // Fixed import
import { useState } from 'react'
import { FaCheck, FaPercent, FaPercentage } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import { HiSparkles } from 'react-icons/hi2'

type BillingCycle = 'yearly' | 'monthly'

interface Feature {
  text: string
  included: boolean
}

interface Plan {
  name: string
  price: string
  period: string
  billedAmount?: string
  highlight?: boolean
  isCurrent?: boolean
  noCard?: boolean
  features: Feature[]
}

interface Plans {
  yearly: Plan[]
  monthly: Plan[]
}

const PLANS: Plans = {
  yearly: [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      isCurrent: true,
      noCard: true,
      features: [
        { text: '**3 messages/week** with AI Doctor', included: true },
        { text: '**1 test result** interpreted by AI', included: true },
        { text: 'AI long-term memory', included: true },
        { text: 'Conversation Summaries', included: true },
        { text: 'Chat attachments', included: true },
        { text: 'Chat history', included: true },
        { text: 'Premium Support', included: false },
      ],
    },
    {
      name: 'Lite',
      price: '$3.99',
      period: 'month',
      billedAmount: '$47.88',
      highlight: true,
      features: [
        { text: '**50 messages/month** with AI Doctor', included: true },
        { text: '**5 test results/month** interpreted by AI', included: true },
        { text: 'AI long-term memory', included: true },
        { text: 'Conversation Summaries', included: true },
        { text: 'Chat Attachments', included: true },
        { text: 'Chat history', included: true },
        { text: 'Premium Support', included: true },
      ],
    },
    {
      name: 'Pro',
      price: '$7.99',
      period: 'month',
      billedAmount: '$95.88',
      features: [
        { text: '**500 messages/month** with AI Doctor', included: true },
        { text: '**15 test results/month** interpreted by AI', included: true },
        { text: 'AI long-term memory', included: true },
        { text: 'Conversation Summaries', included: true },
        { text: 'Chat Attachments', included: true },
        { text: 'Chat history', included: true },
        { text: 'Premium Support', included: true },
      ],
    },
  ],
  monthly: [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      isCurrent: true,
      noCard: true,
      features: [
        { text: '**3 messages/week** with AI Doctor', included: true },
        { text: '**1 test result** interpreted by AI', included: true },
        { text: 'AI long-term memory', included: true },
        { text: 'Conversation Summaries', included: true },
        { text: 'Chat attachments', included: true },
        { text: 'Chat history', included: true },
        { text: 'Premium Support', included: false },
      ],
    },
    {
      name: 'Lite',
      price: '$5.99',
      period: 'month',
      highlight: true,
      features: [
        { text: '**50 messages/month** with AI Doctor', included: true },
        { text: '**5 test results/month** interpreted by AI', included: true },
        { text: 'AI long-term memory', included: true },
        { text: 'Conversation Summaries', included: true },
        { text: 'Chat Attachments', included: true },
        { text: 'Chat history', included: true },
        { text: 'Premium Support', included: true },
      ],
    },
    {
      name: 'Pro',
      price: '$14.99',
      period: 'month',
      features: [
        { text: '**500 messages/month** with AI Doctor', included: true },
        { text: '**15 test results/month** interpreted by AI', included: true },
        { text: 'AI long-term memory', included: true },
        { text: 'Conversation Summaries', included: true },
        { text: 'Chat Attachments', included: true },
        { text: 'Chat history', included: true },
        { text: 'Premium Support', included: true },
      ],
    },
  ],
}

const renderMarkdownText = (text: string) => {
  const parts = text.split('**')
  return parts.map((part, index) => 
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  )
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly')

  return (
   <div className='px-64 py-5'>
    <h1 className='text-2xl mb-3'>Plans & Pricing</h1>
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-6xl mx-auto p-4">
        {/* Billing Cycle Switcher */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex bg-[#afcdca] rounded-full p-1 mb-2 relative w-[200px]">
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-5px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out"
              style={{
                transform: billingCycle === 'yearly' ? 'translateX(1px)' : 'translateX(calc(100% + 3px))',
              }}
            />
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`w-1/2 py-1.5 text-[12px] font-medium transition-colors relative flex items-center justify-center z-10 ${
                billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-600'
              }`}
            >
              Yearly <FaPercentage className='ml-1'/>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`w-1/2 py-1.5 text-[12px] font-medium transition-colors relative z-10 ${
                billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
          </div>
          <p className="text-sm text-[#0F766E]">Save up to 45% with Yearly!</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS[billingCycle].map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg border ${
                plan.highlight ? 'bg-[#afcdca40]' : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                {/* Plan Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold">
                      {plan.highlight ? (
                        <span className='flex items-center'>
                          <HiSparkles className='text-teal-700 mr-1 h-10 w-10'/>
                          {plan.name}
                        </span>
                      ) : plan.name}
                    </h2>
                    {plan.isCurrent && (
                      <span className="px-2 py-1 text-xs font-medium bg-red-400 text-white rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="mb-1">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  {plan.billedAmount && (
                    <div className="text-sm text-gray-600">
                      Billed annually {plan.billedAmount}
                    </div>
                  )}
                  {plan.noCard && (
                    <div className="text-sm text-gray-600">
                      No credit card required
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  className={`w-full py-2 px-4 rounded-sm mb-6 ${
                    plan.isCurrent
                      ? 'bg-white border border-gray-200 text-gray-700'
                      : 'bg-teal-700 text-white hover:bg-teal-800'
                  } transition-colors`}
                >
                  {plan.isCurrent ? 'Current Plan' : 'Choose Plan'}
                </button>

                {/* Features List */}
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-[14px]">
                      {feature.included ? (
                        <FaCheck className="w-3 h-3 text-teal-700 mt-0.5" />
                      ) : (
                        <FaX className="w-3 h-3 text-gray-400 mt-0.5" />
                      )}
                      <span className="text-gray-600">{renderMarkdownText(feature.text)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Billing Details Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex justify-center items-center">
          <AntButton type="primary" size="large">
            My Billing Details
          </AntButton>
        </div>
      </div>
    </div>
   </div>
  )
}