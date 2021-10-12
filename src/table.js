import _ from 'lodash'
import React from 'react'
import { Table, Image } from 'semantic-ui-react'
import axios from 'axios';

const url = 'https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json';
let tableData = [];


axios.get(url).then((response) => {
  response.data.getColleges.forEach((item, i) => {
    tableData.push(item)
  });
});


function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      }
    default:
      throw new Error()
  }
}


const Colleges = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  })
  const { column, data, direction } = state


  return (
    <Table sortable celled fixed style={{width: "60%"}}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'name' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}>
            Partner
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'Prefix' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'Prefix' })}>
            Prefix
          </Table.HeaderCell>
          <Table.HeaderCell>
            Logo/Preroll
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'OfstedRating' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'OfstedRating' })}>
            Ofsted Rating
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {data.map(d => (
          <Table.Row key={d.name}>
          <Table.Cell>{d.name}</Table.Cell>
          <Table.Cell>{d.groupPrefix}</Table.Cell>
          <Table.Cell><Image src={d.logo} size='tiny' centered/></Table.Cell>
          {d.ofstedRating === 'Good' || d.ofstedRating === 'Outstanding' ?
            <Table.Cell positive>{d.ofstedRating}</Table.Cell> :
            d.ofstedRating === 'Inadequate' ?
            <Table.Cell negative>{d.ofstedRating}</Table.Cell> :
            <Table.Cell warning>{d.ofstedRating}</Table.Cell>}
          </Table.Row>
        ))}

      </Table.Body>
    </Table>
  )
}
export default Colleges
