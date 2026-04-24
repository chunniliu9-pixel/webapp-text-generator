'use client'

import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ClipboardDocumentIcon, HandThumbDownIcon, HandThumbUpIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import copy from 'copy-to-clipboard'
import type { Feedbacktype } from '@/app/components/app/chat/type'
import Button from '@/app/components/base/button'
import Toast from '@/app/components/base/toast'
import Tooltip from '@/app/components/base/tooltip'

type IResultHeaderProps = {
  result: string
  showFeedback: boolean
  feedback: Feedbacktype
  onFeedback: (feedback: Feedbacktype) => void
}

const Header: FC<IResultHeaderProps> = ({
  feedback,
  showFeedback,
  onFeedback,
  result,
}) => {
  const { t } = useTranslation()

  // PDF导出函数
  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='text-base font-semibold text-gray-900'>{t('app.generation.resultTitle')}</div>
      <div className='flex items-center gap-1'>
        {/* 复制按钮 */}
        <Tooltip trigger={<Button
          size='small'
          onClick={() => {
            copy(result)
            Toast.notify({ type: 'success', message: 'copied' })
          }}
        >
          <>
            <ClipboardDocumentIcon className='w-4 h-4 mr-1' />
            {t('app.generation.copy')}
          </>
        </Button>}>

        {/* PDF导出按钮 */}
        <Tooltip trigger={<Button
          size='small'
          onClick={handleExportPDF}
        >
          <>
            <DocumentArrowDownIcon className='w-4 h-4 mr-1' />
            导出PDF
          </>
        </Button>}>
        </Tooltip>

        {/* 反馈按钮 */}
        {showFeedback && feedback.rating && feedback.rating === 'like' && (
          <Tooltip trigger={<Button
            size='small'
            onClick={() => {
              onFeedback({
                rating: null,
              })
            }}
            className='flex w-7 h-7 items-center justify-center rounded-md cursor-pointer !text-primary-600 border border-primary-200 bg-primary-100 hover:border-primary-300 hover:bg-primary-200'>
            <HandThumbUpIcon className='w-4 h-4' />
          </Button>}>

        )}
        {showFeedback && feedback.rating && feedback.rating === 'dislike' && (
          <Tooltip trigger={<Button
            size='small'
            onClick={() => {
              onFeedback({
                rating: null,
              })
            }}
            className='flex w-7 h-7 items-center justify-center rounded-md cursor-pointer !text-red-600 border border-red-200 bg-red-100 hover:border-red-300 hover:bg-red-200'>
            <HandThumbDownIcon className='w-4 h-4' />
          </Button>}>

        )}
        {showFeedback && !feedback.rating && (
          <>
            <Tooltip trigger={<Button
              size='small'
              onClick={() => {
                onFeedback({
                  rating: 'like',
                })
              }}
              className='flex w-6 h-6 items-center justify-center rounded-md cursor-pointer hover:bg-gray-100'>
              <HandThumbUpIcon className='w-4 h-4' />
            </Button>}>
            </Tooltip>
            <Tooltip trigger={<Button
              size='small'
              onClick={() => {
                onFeedback({
                  rating: 'dislike',
                })
              }}
              className='flex w-6 h-6 items-center justify-center rounded-md cursor-pointer hover:bg-gray-100'>
              <HandThumbDownIcon className='w-4 h-4' />
            </Button>}>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  )
}

export default React.memo(Header)
