import type { FC } from 'react'
import React from 'react'
import Header from './header'
import type { Feedbacktype } from '@/app/components/app/chat/type'
import { format } from '@/service/base'

export type IResultProps = {
  content: string
  showFeedback: boolean
  feedback: Feedbacktype
  onFeedback: (feedback: Feedbacktype) => void
}
const Result: FC<IResultProps> = ({
  content,
  showFeedback,
  feedback,
  onFeedback,
}) => {
  return (
    <div className='basis-3/4 h-max'>
      <Header result={content} showFeedback={showFeedback} feedback={feedback} onFeedback={onFeedback} />
      <div
        id="pdf-content"
        className='mt-4 w-full flex text-sm leading-5 overflow-scroll font-normal text-gray-900'
        dangerouslySetInnerHTML={{
          __html: format(content),
        }}
      ></div>
    </div>
  )
}
export default React.memo(Result)
