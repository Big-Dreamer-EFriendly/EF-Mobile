import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableRow = ({ data }) => (
  <View style={styles.row}>
    <Text style={styles.cell}>{data.title}</Text>
    <Text style={styles.cell}>{data.content}</Text>
  </View>
);

const TableHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Title</Text>
    <Text style={styles.headerText}>Content</Text>
  </View>
);

const TableView = ({ data }) => (
  <View style={styles.container}>
    <TableHeader />
    {data.map((item, index) => (
      <TableRow key={index} data={item} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cell: {
    flex: 1,
  },
});

export default TableView;
