import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import axios from 'axios';

const url = 'https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json';

const Colleges = () => {
  const [college, setCollege] = React.useState(null);

  React.useEffect(() => {
    axios.get(url).then((response) => {
      setCollege(response.data);
    });
  }, []);
  if(!college) return null;

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Partner</Table.HeaderCell>
            <Table.HeaderCell>Prefix</Table.HeaderCell>
            <Table.HeaderCell>Logo/Preroll</Table.HeaderCell>
            <Table.HeaderCell>Ofsted Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{college.getColleges[0].name}</Table.Cell>
            <Table.Cell>{college.getColleges[0].groupPrefix}</Table.Cell>
            <Table.Cell>{college.getColleges[0].logo}</Table.Cell>
            <Table.Cell>{college.getColleges[0].ofstedRating}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default Colleges
