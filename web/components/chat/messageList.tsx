import React, { useRef, useEffect } from 'react'
import cn from 'classnames'
import { MsgMeta } from '../../store/message/messageSlice'

// TODO: Virtualize
export const MessageList = ({
  messages,
  myPk,
}: {
  messages: { msg: string; senderPk: string; timestamp: Date; id: number; meta: MsgMeta[] }[]
  myPk: string
}) => {
  const lastRef = useRef(null)
  const scrollToBottom = () => {
    lastRef.current.scrollIntoView()
    lastRef.current.scrollTop = lastRef.current.scrollHeight
  }
  useEffect(scrollToBottom, [messages])

  return (
    <div className="bg-gray-400 px-3 overflow-y-auto" style={{ height: '78vh' }}>
      {messages.map((msg, i) => (
        <ChatBubble
          key={i}
          myPk={myPk}
          senderPk={msg.senderPk}
          msg={msg.msg}
          timestamp={msg.timestamp}
          meta={msg.meta}
        />
      ))}
      <div ref={lastRef} />
    </div>
  )
}

interface BubbleProps {
  myPk: string
  senderPk: string
  msg: string | null
  timestamp: Date
  meta: MsgMeta[]
}

export const ChatBubble = ({ msg, myPk, senderPk, timestamp, meta }: BubbleProps) => {
  return (
    <div
      className={cn(
        'relative pb-2 max-w-sm py-2 px-4 rounded-md mt-1',
        { 'ml-auto': myPk === senderPk },
        myPk === senderPk ? (msg == null ? 'bg-gray-400' : 'bg-green-100') : 'bg-white',
      )}
    >
      <p className={cn('text-sm m-0', msg == null ? 'text-gray-600 text-xs' : 'text-gray-900')}>{msg}</p>
      {msg != null && (
        <div className="absolute right-0 bottom-0 text-xs text-gray-500 mr-2">
          {`${timestamp.getHours()}:${timestamp.getMinutes()}`}
        </div>
      )}
    </div>
  )
}
