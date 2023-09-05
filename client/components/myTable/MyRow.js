'use client'

import { TableAlign, TableDataType } from '@/enumerations/enumerations'
import { formatDate, numberWithCommas } from '@/utils/functionUtil'
import MyCheckbox from '../myCheckbox/MyCheckbox'

const MyRow = ({
  valueField,
  item,
  tableId,
  isShowActionBtns,
  isShowEditBtn,
  isShowDeletBtn,
  editBtn,
  deleteBtn,
  selected = false,
  selectable = false,
  columns = [],
  onSelect,
  onDelete,
  onEdit,
}) => {
  const handleChangeCheck = (checked) => {
    if (typeof onSelect !== 'function') return
    onSelect(checked)
  }

  const handleClickDelete = () => {
    if (typeof onDelete !== 'function') return
    onDelete(item)
  }

  const handleClickEdit = () => {
    if (typeof onEdit !== 'function') return
    onEdit(item)
  }

  return (
    <tr className="group">
      {selectable && (
        <td className="sticky left-0 z-[1] h-12 text-sm border-r border-b border-input-border bg-white transition-colors duration-200 group-hover:bg-orange-100 last:border-r-transparent group-last:border-b-transparent">
          <div className="flex items-center justify-center">
            <MyCheckbox
              id={`check-${tableId}-${item[valueField]}`}
              name={`check-${tableId}-${item[valueField]}`}
              checked={selected}
              onChange={handleChangeCheck}
            />
          </div>
        </td>
      )}

      {columns.map((column, columnIndex) => {
        let value = item[column.field] || ''

        let textAlign

        switch (column.dataType) {
          case TableDataType.Number:
            textAlign = 'right'
          case TableDataType.Money:
            textAlign = 'right'
            value = numberWithCommas(value)
            break
          case TableDataType.Date:
            value = formatDate(value)
            textAlign = 'center'
            break
          case TableDataType.Custom:
            textAlign = 'left'
            if (typeof column.renderFn === 'function') value = column.renderFn(item)
            break
          default:
            textAlign = 'left'
            break
        }

        switch (column.align) {
          case TableAlign.Center:
            textAlign = 'center'
            break
          case TableAlign.Right:
            textAlign = 'right'
            break
          case TableAlign.Left:
            textAlign = 'left'
            break
          default:
            break
        }

        return (
          <td
            key={columnIndex}
            className="h-12 px-5 text-sm border-r border-b border-input-border bg-white transition-colors duration-200 group-hover:bg-orange-100 last:border-r-transparent group-last:border-b-transparent"
            style={{
              borderRight: isShowActionBtns
                ? columnIndex === columns.length - 1
                  ? 'none'
                  : null
                : null,
              textAlign,
            }}
          >
            {value}
          </td>
        )
      })}

      {isShowActionBtns && (
        <td className="sticky right-0 z-[1] h-12 px-5 text-sm border-l border-b border-input-border bg-white transition-colors duration-200 group-hover:bg-orange-100 group-last:border-b-transparent">
          <div className="flex items-center justify-between">
            {isShowEditBtn && <div onClick={handleClickEdit}>{editBtn}</div>}
            {isShowDeletBtn && <div onClick={handleClickDelete}>{deleteBtn}</div>}
          </div>
        </td>
      )}
    </tr>
  )
}

export default MyRow
