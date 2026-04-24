'use client'

import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  ClipboardDocumentIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline'
import copy from 'copy-to-clipboard'
import html2pdf from 'html2pdf.js'

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

  // ✅ PDF生成函数
  const handleExportPDF = () => {
    const element = document.getElementById('pdf-content')

    if (!element) {
      Toast.notify({ type: 'error', message: '未找到可导出的内容' })
      return
    }

    const opt = {
      margin: 10,
      filename: 'AI-result.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    }

    html2pdf().set(opt).from(element).save()

    Toast.notify({
      type: 'success',
      message: 'PDF已下载，请发送到微信',
    })
  }

  return (
    <div className='flex w-full justify-between items-center '>
      <div className='text-gray-800 text-2xl leading-4 font-normal'>
        {t('app.generation.resultTitle')}
      </div>

      <div className='flex items-center space-x-2'>
        {/* 复制按钮 */}
        <Button
          className='flex items-center !h-7 !p-[2px] !pr-2'
          onClick={() => {
            copy(result)
            Toast.notify({ type: 'success', message: 'copied' })
          }}
        >
          <>
            <ClipboardDocumentIcon className='text-gray-500 w-4 h-3 mr-1' />
            <span className='text-gray-500 text-xs leading-3'>
              {t('app.generation.copy')}
            </span>
          </>
        </Button>

        {/* ✅ PDF按钮 */}
        <Tooltip content="导出PDF">
          <div
            onClick={handleExportPDF}
            className='flex items-center cursor-pointer px-2 h-7 rounded-md border border-gray-200 hover:bg-gray-100'
          >
            <DocumentArrowDownIcon className='w-4 h-4 mr-1 text-gray-600' />
            <span className='text-xs text-gray-600'>PDF</span>
          </div>
        </Tooltip>

        {/* 👍 已点赞 */}
        {showFeedback && feedback.rating === 'like' && (
          <Tooltip
            selector="undo-feedback-like"
            content="Undo Great Rating"
          >
            <div
              onClick={() => onFeedback({ rating: null })}
              className='flex w-7 h-7 items-center justify-center rounded-md cursor-pointer !text-primary-600 border border-primary-200 bg-primary-100 hover:border-primary-300 hover:bg-primary-200'
            >
              <HandThumbUpIcon width={16} height={16} />
            </div>
          </Tooltip>
        )}

        {/* 👎 已点踩 */}
        {showFeedback && feedback.rating === 'dislike' && (
          <Tooltip
            selector="undo-feedback-dislike"
            content="Undo Undesirable Response"
          >
            <div
              onClick={() => onFeedback({ rating: null })}
              className='flex w-7 h-7 items-center justify-center rounded-md cursor-pointer !text-red-600 border border-red-200 bg-red-100 hover:border-red-300 hover:bg-red-200'
            >
              <HandThumbDownIcon width={16} height={16} />
            </div>
          </Tooltip>
        )}

        {/* 未反馈 */}
        {showFeedback && !feedback.rating && (
          <div className='flex rounded-lg border border-gray-200 p-[1px] space-x-1'>
            <Tooltip
              selector="feedback-like"
              content="Great Rating"
            >
              <div
                onClick={() => onFeedback({ rating: 'like' })}
                className='flex w-6 h-6 items-center justify-center rounded-md cursor-pointer hover:bg-gray-100'
              >
                <HandThumbUpIcon width={16} height={16} />
              </div>
            </Tooltip>

            <Tooltip
              selector="feedback-dislike"
              content="Undesirable Response"
            >
              <div
                onClick={() => onFeedback({ rating: 'dislike' })}
                className='flex w-6 h-6 items-center justify-center rounded-md cursor-pointer hover:bg-gray-100'
              >
                <HandThumbDownIcon width={16} height={16} />
              </div>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Header)
