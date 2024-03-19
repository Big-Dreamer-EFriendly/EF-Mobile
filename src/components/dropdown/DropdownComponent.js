import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as Yup from 'yup';

const {width, height} = Dimensions.get('window')
const provincesList = [
  { label: 'Hà Nội', value: 'Hà Nội' },
  { label: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
  { label: 'Đà Nẵng', value: 'Đà Nẵng' },
  { label: 'Hải Phòng', value: 'Hải Phòng' },
  { label: 'Cần Thơ', value: 'Cần Thơ' },
  { label: 'An Giang', value: 'An Giang' },
  { label: 'Bà Rịa - Vũng Tàu', value: 'Bà Rịa - Vũng Tàu' },
  { label: 'Bắc Giang', value: 'Bắc Giang' },
  { label: 'Bắc Kạn', value: 'Bắc Kạn' },
  { label: 'Bạc Liêu', value: 'Bạc Liêu' },
  { label: 'Bắc Ninh', value: 'Bắc Ninh' },
  { label: 'Bến Tre', value: 'Bến Tre' },
  { label: 'Bình Định', value: 'Bình Định' },
  { label: 'Bình Dương', value: 'Bình Dương' },
  { label: 'Bình Phước', value: 'Bình Phước' },
  { label: 'Bình Thuận', value: 'Bình Thuận' },
  { label: 'Cà Mau', value: 'Cà Mau' },
  { label: 'Cao Bằng', value: 'Cao Bằng' },
  { label: 'Đắk Lắk', value: 'Đắk Lắk' },
  { label: 'Đắk Nông', value: 'Đắk Nông' },
  { label: 'Điện Biên', value: 'Điện Biên' },
  { label: 'Đồng Nai', value: 'Đồng Nai' },
  { label: 'Đồng Tháp', value: 'Đồng Tháp' },
  { label: 'Gia Lai', value: 'Gia Lai' },
  { label: 'Hà Giang', value: 'Hà Giang' },
  { label: 'Hà Nam', value: 'Hà Nam' },
  { label: 'Hà Tĩnh', value: 'Hà Tĩnh' },
  { label: 'Hải Dương', value: 'Hải Dương' },
  { label: 'Hậu Giang', value: 'Hậu Giang' },
  { label: 'Hòa Bình', value: 'Hòa Bình' },
  { label: 'Hưng Yên', value: 'Hưng Yên' },
  { label: 'Khánh Hòa', value: 'Khánh Hòa' },
  { label: 'Kiên Giang', value: 'Kiên Giang' },
  { label: 'Kon Tum', value: 'Kon Tum' },
  { label: 'Lai Châu', value: 'Lai Châu' },
  { label: 'Lâm Đồng', value: 'Lâm Đồng' },
  { label: 'Lạng Sơn', value: 'Lạng Sơn' },
  { label: 'Lào Cai', value: 'Lào Cai' },
  { label: 'Long An', value: 'Long An' },
  { label: 'Nam Định', value: 'Nam Định' },
  { label: 'Nghệ An', value: 'Nghệ An' },
  { label: 'Ninh Bình', value: 'Ninh Bình' },
  { label: 'Ninh Thuận', value: 'Ninh Thuận' },
  { label: 'Phú Thọ', value: 'Phú Thọ' },
  { label: 'Quảng Bình', value: 'Quảng Bình' },
  { label: 'Quảng Nam', value: 'Quảng Nam' },
  { label: 'Quảng Ngãi', value: 'Quảng Ngãi' },
  { label: 'Quảng Ninh', value: 'Quảng Ninh' },
  { label: 'Quảng Trị', value: 'Quảng Trị' },
  { label: 'Sóc Trăng', value: 'Sóc Trăng' },
  { label: 'Sơn La', value: 'Sơn La' },
  { label: 'Tây Ninh', value: 'Tây Ninh' },
  { label: 'Thái Bình', value: 'Thái Bình' },
  { label: 'Thái Nguyên', value: 'Thái Nguyên' },
  { label: 'Thanh Hóa', value: 'Thanh Hóa' },
  { label: 'Thừa Thiên - Huế', value: 'Thừa Thiên - Huế' },
  { label: 'Tiền Giang', value: 'Tiền Giang' },
  { label: 'Trà Vinh', value: 'Trà Vinh' },
  { label: 'Tuyên Quang', value: 'Tuyên Quang' },
  { label: 'Vĩnh Long', value: 'Vĩnh Long' },
  { label: 'Vĩnh Phúc', value: 'Vĩnh Phúc' },
  { label: 'Yên Bái', value: 'Yên Bái' },
];


const DropdownComponent = ({ onProvinceChange, defautProvince }) => {
  const [value, setValue] = useState(defautProvince);
  const handleChange = (item) => {
    setValue(item.value);
    onProvinceChange && onProvinceChange(item.value);
  };
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle = {styles.itemTextStyle}
      data={provincesList}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select province"
      searchPlaceholder="Search..."
      value={value}
      onChange={handleChange}
      renderLeftIcon={() => (
        <Image source={require("../../assets/home.png")} style={styles.icon} />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: height * 0.07,
    width: width * 0.8,
    paddingVertical: 0,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(217, 217, 217, 0.25)',
    borderRadius: 17,
    color: 'black',
    // flexDirection: 'row',
    // alignItems: 'center'
   
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: width * 0.035,
    color: '#999999'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black'
  },
  itemTextStyle: {
    color:'black'
  }
});