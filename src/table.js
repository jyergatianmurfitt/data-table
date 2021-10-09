import React from 'react'
import { Icon, Label, Menu, Table, Image } from 'semantic-ui-react'
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
      <Table celled style={{width: "60%"}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Partner</Table.HeaderCell>
            <Table.HeaderCell>Prefix</Table.HeaderCell>
            <Table.HeaderCell>Logo/Preroll</Table.HeaderCell>
            <Table.HeaderCell>Ofsted Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {college.getColleges.map(d => (<Table.Row><Table.Cell>{d.name}</Table.Cell><Table.Cell>{d.groupPrefix}</Table.Cell><Table.Cell><Image src={d.logo} size='tiny'/></Table.Cell><Table.Cell>{d.ofstedRating}</Table.Cell></Table.Row>))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Colleges
