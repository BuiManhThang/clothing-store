'use client'
import {
  MyButton,
  MyTextField,
  MyPopup,
  MyCombobox,
  MyCheckbox,
  MyRadio,
  MyImageUploader,
  MyImageUploaderMultiple,
  MyTable,
} from '@/components'
import MySlide from '@/components/mySlide/MySlide'
import { ButtonType, TableDataType, TextFieldType } from '@/enumerations/enumerations'
import { useState } from 'react'
import Image1 from '../../assets/images/1.jpg'
import Image2 from '../../assets/images/2.jpg'
import Image3 from '../../assets/images/3.jpg'
import Image4 from '../../assets/images/4.jpg'
import Image5 from '../../assets/images/5.jpg'
import Image6 from '../../assets/images/6.jpg'
import Image from 'next/image'

const COMBOBOX_OPTIONS = [
  {
    id: 1,
    text: 'Cơm sườn',
  },
  {
    id: 2,
    text: 'Cơm gà',
  },
  {
    id: 3,
    text: 'Bún đậu',
  },
  {
    id: 4,
    text: 'Bún chả',
  },
  {
    id: 5,
    text: 'Phở bò Phở bò Phở bò Phở bò Phở bò Phở bò Phở bò Phở bò Phở bò Phở bò ',
  },
  {
    id: 6,
    text: 'Chả cuốn',
  },
  {
    id: 7,
    text: 'Bánh đa',
  },
  {
    id: 8,
    text: 'Lem chua',
  },
  {
    id: 9,
    text: 'Cocacola',
  },
  {
    id: 10,
    text: 'Pepsi',
  },
  {
    id: 11,
    text: 'Cơm gà',
  },
]

const IMAGES = [Image1, Image2, Image3, Image4, Image5, Image6]

const COLUMNS = [
  {
    title: 'Code',
    field: 'code',
    dataType: TableDataType.Text,
    width: 100,
  },
  {
    title: 'Name',
    field: 'name',
    dataType: TableDataType.Text,
    width: 500,
  },
  {
    title: 'Image',
    field: 'image',
    dataType: TableDataType.Custom,
    width: 120,
    renderFn: (rowData) => {
      return (
        <div className="w-[80px] h-[80px] flex items-center">
          <Image
            src={rowData.image}
            width={80}
            height={80}
            className="object-contain object-center"
          />
        </div>
      )
    },
  },
  {
    title: 'Birthday',
    field: 'birthday',
    dataType: TableDataType.Date,
    width: 120,
  },
  {
    title: 'Email',
    field: 'email',
    dataType: TableDataType.Text,
    minWidth: 200,
  },
  {
    title: 'PhoneNumber',
    field: 'phoneNumber',
    dataType: TableDataType.Text,
    width: 200,
  },
  {
    title: 'Age',
    field: 'age',
    dataType: TableDataType.Number,
    width: 100,
  },
  {
    title: 'Salary',
    field: 'salary',
    dataType: TableDataType.Money,
    width: 150,
  },
]

const ITEMS = [
  {
    id: '1',
    code: 'U.001',
    name: 'Nguyễn Văn A',
    email: 'nva@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 20,
    salary: 10000000,
  },
  {
    id: '2',
    code: 'U.002',
    name: 'Nguyễn Văn B ARFA',
    email: 'nvb@gmail.com',
    phoneNumber: '1234567894',
    image: Image2,
    birthday: new Date(),
    age: 19,
    salary: 10000000,
  },
  {
    id: '3',
    code: 'U.003',
    name: 'Nguyễn Văn C',
    email: 'nvb@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 23,
    salary: 10000000,
  },
  {
    id: '4',
    code: 'U.004',
    name: 'Nguyễn Văn A',
    email: 'nva@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 20,
    salary: 10000000,
  },
  {
    id: '5',
    code: 'U.005',
    name: 'Nguyễn Văn B ARFA',
    email: 'nvb@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 19,
    salary: 10000000,
  },
  {
    id: '6',
    code: 'U.006',
    name: 'Nguyễn Văn C',
    email: 'nvb@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 23,
    salary: 10000000,
  },
  {
    id: '7',
    code: 'U.007',
    name: 'Nguyễn Văn A',
    email: 'nva@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 20,
    salary: 10000000,
  },
  {
    id: '8',
    code: 'U.008',
    name: 'Nguyễn Văn B ARFA',
    email: 'nvb@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 19,
    salary: 10000000,
  },
  {
    id: '9',
    code: 'U.009',
    name: 'Nguyễn Văn C',
    email: 'nvb@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 23,
    salary: 10000000,
  },
  {
    id: '10',
    code: 'U.0010',
    name: 'Nguyễn Văn A',
    email: 'nva@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 20,
    salary: 10000000,
  },
  {
    id: '11',
    code: 'U.0011',
    name: 'Nguyễn Văn B ARFA',
    email: 'nvb@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 19,
    salary: 10000000,
  },
  {
    id: '12',
    code: 'U.0012',
    name: 'Nguyễn Văn C',
    email: 'nvb@gmail.com',
    phoneNumber: '1234567894',
    image: Image1,
    birthday: new Date(),
    age: 23,
    salary: 10000000,
  },
]

const Page = () => {
  const [input3Value, setInput3Value] = useState('')
  const [input4Value, setInput4Value] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [comboboxValue, setComboboxValue] = useState(null)
  const [comboboxValue2, setComboboxValue2] = useState(null)
  const [comboboxValue3, setComboboxValue3] = useState(null)
  const [isCheck1, setIsCheck1] = useState(false)
  const [radioValue, setRadioValue] = useState(1)
  const [image, setImage] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [images1, setImages1] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  return (
    <div className="container mx-auto">
      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MyTable</h1>
        <div className="w-full h-[400px]">
          <MyTable
            columns={COLUMNS}
            valueField="id"
            items={ITEMS}
            selectedItems={selectedItems}
            selectable
            isShowDeletBtn
            isShowEditBtn
            onSelect={(items) => setSelectedItems(items)}
            onDelete={(item) => console.log('onDelete', item)}
            onEdit={(item) => console.log('onEdit', item)}
          />
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MyImageUploaderMultiple</h1>

        <div className="w-[800px]">
          <MyImageUploaderMultiple
            name="image-uploader-multiple-1"
            id="image-uploader-multiple-1"
            label="Image uploader multiple 1"
            value={images1}
            width={120}
            height={120}
            onChange={(files) => setImages1(files)}
          />
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MyImageUploader</h1>

        <div className="flex gap-x-4">
          <div className="w-[200px]">
            <MyImageUploader
              name="image"
              id="image"
              width="200px"
              height="200px"
              label="My Image Uploader"
              required
              value={image}
              onChange={(newFile) => setImage(newFile)}
            />
          </div>
          <div className="w-[200px]">
            <MyImageUploader
              name="image2"
              id="image2"
              width="200px"
              height="200px"
              label="My Image 2 Uploader"
              required
              value={image2}
              error={'Có lỗi xảy ra!'}
              onChange={(newFile) => setImage2(newFile)}
            />
          </div>
          <div className="w-[200px]">
            <MyImageUploader
              name="image3"
              id="image3"
              width="200px"
              height="200px"
              label="My Image 3 Uploader"
              required
              value={image3}
              disabled
              onChange={(newFile) => setImage3(newFile)}
            />
          </div>
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MyCheckbox</h1>
        <MyCheckbox
          id="my-checkbox-1"
          name="my-checkbox-1"
          label="My checkbox 1"
          value={1}
          checked={isCheck1}
          onChange={(checked) => setIsCheck1(checked)}
        />
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MyCheckbox</h1>
        <MyRadio
          id="my-radio-1"
          name="my-radio"
          label="My radio 1"
          value={1}
          checked={radioValue === 1}
          onChange={(checked, value) => checked && setRadioValue(value)}
        />
        <MyRadio
          id="my-radio-2"
          name="my-radio"
          label="My radio 2"
          value={2}
          checked={radioValue === 2}
          onChange={(checked, value) => checked && setRadioValue(value)}
        />
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MyButton</h1>
        <div className="flex gap-x-4 items-center mb-2">
          <MyButton tooltip="hello" onClick={() => console.log('onClick')}>
            Button Primary
          </MyButton>
          <MyButton type={ButtonType.Secondary}>Button Secondary</MyButton>
          <MyButton type={ButtonType.Special}>Button Special</MyButton>
          <MyButton disabled>Button Primary</MyButton>
          <MyButton type={ButtonType.Secondary} disabled>
            Button Secondary
          </MyButton>
          <MyButton type={ButtonType.Special} disabled>
            Button Special
          </MyButton>
        </div>
        <div className="flex gap-x-4 items-center">
          <MyButton isLoading>Button Primary</MyButton>
          <MyButton type={ButtonType.Secondary} isLoading>
            Button Secondary
          </MyButton>
          <MyButton type={ButtonType.Special} isLoading>
            Button Special
          </MyButton>
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MyTextField</h1>
        <div className="mb-2 w-[400px]">
          <MyTextField
            id="text-field-1"
            name="text-field-1"
            label="Text Field 1"
            placeholder="Enter text field 1"
            textFieldType={TextFieldType.Secondary}
            required
            error="Bắt buộc nhập"
          />
        </div>
        <div className="mb-2 w-[400px]">
          <MyTextField
            id="text-field-2"
            name="text-field-2"
            label="Text Field 2"
            placeholder="Enter text field 2"
            textFieldType={TextFieldType.Secondary}
            isLabelHorizontal
          />
        </div>
        <div className="mb-2 w-[400px]">
          <MyTextField
            id="text-field-3"
            name="text-field-3"
            label="Text Field 3"
            placeholder="Enter text field 3"
            textFieldType={TextFieldType.Secondary}
            endIcon={<i className="fa-solid fa-chevron-down"></i>}
            endIconClassName="cursor-pointer hover:bg-gray-200 transition-colors"
          />
        </div>
        <div className="mb-2 w-[400px]">
          <MyTextField
            id="text-field-3"
            name="text-field-3"
            label="Enter text field 3"
            value={input3Value}
            onChange={(e) => setInput3Value(e.target.value)}
          />
        </div>
        <div className="mb-2 w-[400px]">
          <MyTextField
            id="text-field-4"
            name="text-field-4"
            label="Enter text field 4"
            value={input4Value}
            required
            onChange={(e) => setInput4Value(e.target.value)}
          />
        </div>
        <div className="mb-2 w-[400px]">
          <MyTextField id="text-field-5" name="text-field-5" placeholder="Enter text field 5" />
        </div>
        <div className="mb-2 w-[400px]">
          <MyTextField
            id="text-field-6"
            name="text-field-6"
            placeholder="Enter text field 6"
            disabled
          />
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MyPopup</h1>
        <MyButton onClick={() => setIsOpenPopup(true)}>Open popup</MyButton>
        <MyPopup
          isOpen={isOpenPopup}
          title="This is my popup"
          onClose={() => setIsOpenPopup(false)}
        >
          <div className="w-[300px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis officia iure velit
            eveniet non ducimus, ullam impedit! Illum nobis similique veniam natus quas nostrum,
            dicta ipsa saepe eius! Exercitationem, voluptates.
          </div>
        </MyPopup>
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MyCombobox</h1>
        <div className="mb-2 w-[400px]">
          <MyCombobox
            id="combobox-1"
            name="combobox-1"
            label="Combobox 1"
            placeholder="Enter combobox 1"
            required
            popoverClassName="w-[400px]"
            isAllowFreeText={false}
            options={COMBOBOX_OPTIONS}
            value={comboboxValue}
            onChange={(e) => setComboboxValue(e)}
          />
        </div>
        <div className="mb-2 w-[400px]">
          <MyCombobox
            id="combobox-2"
            name="combobox-2"
            label="Combobox 2"
            placeholder="Enter combobox 2"
            required
            isLabelHorizontal
            popoverClassName="w-[400px]"
            options={COMBOBOX_OPTIONS}
            value={comboboxValue2}
            onChange={(e) => setComboboxValue2(e)}
          />
        </div>
        <div className="mb-2 w-[400px]">
          <MyCombobox
            id="combobox-3"
            name="combobox-3"
            label="Combobox 3"
            placeholder="Enter combobox 3"
            required
            popoverClassName="w-[400px]"
            error={'Có lỗi xảy ra'}
            options={COMBOBOX_OPTIONS}
            value={comboboxValue3}
            onChange={(e) => setComboboxValue3(e)}
          />
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-lg font-bold mb-2">MySlide</h1>
        <MySlide images={IMAGES} className="rounded-md overflow-hidden" />
      </div>
    </div>
  )
}

export default Page
