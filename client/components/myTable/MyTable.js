'use client'

import { TableAlign, TableDataType } from '@/enumerations/enumerations'
import { v4 as uuidv4 } from 'uuid'
import SimpleBar from 'simplebar-react'
import MyRow from './MyRow'
import MyCheckbox from '../myCheckbox/MyCheckbox'
import MyTooltipWrapper from '../myTooltip/MyTooltipWrapper'
import { useEffect, useState } from 'react'

const getWidth = (value) => {
  if (!value) return 'auto'
  if (typeof value === 'string') return value
  return `${value}px`
}

const MyTable = ({
  valueField,
  isShowEditBtn = false,
  isShowDeletBtn = false,
  editBtn = (
    <MyTooltipWrapper
      className="text-lg cursor-pointer text-gray-500 transition-colors duration-200 hover:text-primary"
      content="Sửa"
    >
      <i className="fa-solid fa-pen-to-square"></i>
    </MyTooltipWrapper>
  ),
  deleteBtn = (
    <MyTooltipWrapper
      className="text-lg cursor-pointer text-gray-500 transition-colors duration-200 hover:text-red-500"
      content="Xóa"
    >
      <i className="fa-solid fa-trash"></i>
    </MyTooltipWrapper>
  ),
  selectable = false,
  selectedItems = [],
  columns = [],
  items = [],
  onSelect,
  onDelete,
  onEdit,
}) => {
  const isSelectAll = items.length === selectedItems.length
  const isShowActionBtns = isShowDeletBtn || isShowEditBtn
  const [tableId, setTableId] = useState('')

  useEffect(() => {
    setTableId(uuidv4())
  }, [])

  const handleChangeCheckAll = (checked) => {
    if (typeof onSelect !== 'function') return
    if (checked) {
      onSelect([...items])
    } else {
      onSelect([])
    }
  }

  const handleSelectItem = (checked, item) => {
    if (typeof onSelect !== 'function') return
    if (checked) {
      onSelect([...selectedItems, item])
    } else {
      const itemIndex = selectedItems.findIndex(
        (selectedItem) => selectedItem[valueField] === item[valueField]
      )
      if (itemIndex === -1) return
      const newSelectedItems = [...selectedItems]
      newSelectedItems.splice(itemIndex, 1)
      onSelect(newSelectedItems)
    }
  }

  const handleClickDelete = (item) => {
    if (typeof onDelete !== 'function') return
    onDelete(item)
  }

  const handleClickEdit = (item) => {
    if (typeof onEdit !== 'function') return
    onEdit(item)
  }

  return (
    <SimpleBar className="w-full h-full my-table" autoHide={false}>
      <div className="w-full">
        <table className="relative w-full table-fixed border-spacing-0 border-separate">
          <colgroup>
            {selectable && (
              <col
                style={{
                  width: '48px',
                }}
              />
            )}
            {columns.map((column, columnIndex) => {
              return (
                <col
                  key={columnIndex}
                  style={{
                    width: getWidth(column.width),
                    minWidth: column.width ? null : getWidth(column.minWidth),
                  }}
                />
              )
            })}
            {isShowActionBtns && (
              <col
                style={{
                  width: '84px',
                }}
              />
            )}
          </colgroup>
          <thead>
            <tr>
              {selectable && (
                <th className="sticky top-0 left-0 z-[1] h-12 text-sm border-r border-b border-input-border bg-white first:z-[2] last:border-r-transparent">
                  <div className="flex items-center justify-center">
                    <MyCheckbox
                      id={`check-all-${tableId}`}
                      name="check-all"
                      checked={isSelectAll}
                      onChange={handleChangeCheckAll}
                    />
                  </div>
                </th>
              )}

              {columns.map((column, columnIndex) => {
                let textAlign

                switch (column.dataType) {
                  case TableDataType.Number:
                  case TableDataType.Money:
                    textAlign = 'right'
                    break
                  case TableDataType.Date:
                    textAlign = 'center'
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
                  <th
                    key={columnIndex}
                    className={`sticky top-0 z-[1] h-12 px-5 text-sm border-r border-b border-input-border bg-white last:border-r-transparent`}
                    style={{
                      borderRight: isShowActionBtns
                        ? columnIndex === columns.length - 1
                          ? 'none'
                          : null
                        : null,
                      textAlign,
                    }}
                  >
                    {column.title}
                  </th>
                )
              })}

              {isShowActionBtns && (
                <th className="sticky top-0 right-0 z-[1] h-12 px-5 text-sm border-l border-b border-input-border bg-white last:z-[2]" />
              )}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              return (
                <MyRow
                  key={item[valueField]}
                  item={item}
                  columns={columns}
                  valueField={valueField}
                  selectable={selectable}
                  tableId={tableId}
                  isShowActionBtns={isShowActionBtns}
                  isShowDeletBtn={isShowDeletBtn}
                  isShowEditBtn={isShowEditBtn}
                  deleteBtn={deleteBtn}
                  editBtn={editBtn}
                  selected={
                    selectedItems.findIndex(
                      (selectedItem) => selectedItem[valueField] === item[valueField]
                    ) >= 0
                  }
                  onSelect={(checked) => handleSelectItem(checked, item)}
                  onDelete={handleClickDelete}
                  onEdit={handleClickEdit}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </SimpleBar>
  )
}

export default MyTable
