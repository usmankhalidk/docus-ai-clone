'use client'
import { useState } from 'react'
import {

  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Disclosure,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { FaFlaskVial } from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { MdGroups2 } from "react-icons/md";
import Link from 'next/link'
const products = [
  { name: 'AI Doctor', href: 'ai-doctor', icon: HiChatBubbleLeftRight },
  { name: 'Lab Test Interpretation', href: 'lab-test-interpretation', icon: FaFlaskVial },
  { name: 'Second Opinion', href: 'second-opinion', icon: MdGroups2 },
]
const Resources = [
  { name: 'Blog', href: 'blog' },
  { name: 'Symptopms Guide', href: 'symptoms-guide' },
  { name: 'Knowloedge Base', href: 'knowledge-base' },
  { name: 'Glossary', href: 'glossary' },
]

export default function Example() {
  const [open, setOpen] = useState(false)
  return (<>
    <header className="bg-white fixed top-0 left-0 right-0 z-10 hidden lg:block">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-16">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Your Company Logo"
              src="/images/docus-logo.svg"
              className="h-9 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-lg font-semibold text-gray-900">
              Solutions
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden  bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center rounded-lg  text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600" />
                    </div>
                    <div className="flex-auto">
                      <Link href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </PopoverPanel>
          </Popover>

          <Link href="/pricing"> <a className="text-lg font-semibold text-gray-900"> Pricing </a> </Link>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-lg font-semibold text-gray-900">
              Resources
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden  bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {Resources.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center rounded-lg  text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <Link href={item.href} className="block text-base text-gray-900 p-3 text-md">
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </PopoverPanel>
          </Popover>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-5">
          {/* Sign In link */}
          <Link href="/login" className="text-lg font-semibold text-gray-900 hover:text-button_color">
            Sign in
          </Link>

          {/* Get Started button */}
          <Link href="/signup">
            <button
              type="submit"
              className="rounded-sm bg-button_color px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-button_color_onHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Started For Free
            </button>
          </Link>
        </div>
      </nav>
    </header>


    <div className='flex items-center justify-between p-5'>
      <a href="#" className=" block lg:hidden ">
        <span className="sr-only">Your Company</span>
        <img
          alt="Your Company Logo"
          src="https://docus.ai/docus-dark-logo.svg"
          className="h-9 w-auto"
        />
      </a>
      <div
        className="h-12 w-12 bg-[rgb(245,245,245)] rounded-full flex justify-center items-center cursor-pointer"
        onClick={() => { setOpen(true) }}
      >
        <Bars3Icon className="size-11" />
      </div>
    </div>

    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-0 flex max-w-full">
            <Dialog.Panel
              transition
              className="pointer-events-auto relative w-full h-full transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <Dialog.Title className="text-base font-semibold text-gray-900 flex justify-between items-center">
                    <div>
                      <img
                        alt="Your Company Logo"
                        src="https://docus.ai/docus-dark-logo.svg"
                        className="h-6 w-auto"
                      />
                    </div>
                    <div onClick={() => setOpen(false)} className="cursor-pointer">
                      <XMarkIcon className="size-6" />
                    </div>
                  </Dialog.Title>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="space-y-4">
                    {/* Solutions Accordion */}
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between items-center py-2 text-lg font-semibold text-gray-900">
                            Solutions
                            <ChevronDownIcon
                              className={`size-5 transform ${open ? 'rotate-180' : ''}`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-2 pl-4">
                            {products.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                              >
                                <item.icon aria-hidden="true" className="size-6 text-gray-600" />
                                <span>{item.name}</span>
                              </a>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <a href="#" className="block py-2 text-lg font-semibold text-gray-900">
                      Pricing
                    </a>
                    {/* Resources Accordion */}
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between items-center py-2 text-lg font-semibold text-gray-900">
                            Resources
                            <ChevronDownIcon
                              className={`size-5 transform ${open ? 'rotate-180' : ''}`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-2 pl-4">
                            {Resources.map((item) => (

                              <a
                                key={item.name}
                                href={item.href}
                                className="block text-gray-700 hover:text-gray-900"
                              >
                                {item.name}
                              </a>

                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

                    {/* Static Links */}



                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full rounded-sm bg-button_color px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-button_color_onHover"
                  >
                    Get Started For Free
                  </button>
                  <a href="#" className="block py-2 text-lg font-semibold text-gray-900 text-center">
                    Sign In
                  </a>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>



  </>
  )
}




