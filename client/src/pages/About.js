import {Container, Card} from 'react-bootstrap'

export default function About() {
    const img = 'https://images.pexels.com/photos/5832905/pexels-photo-5832905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    return (
        <Container>
            <Card style={{ width: '60%' }} className="mx-auto mt-5 shadow">
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>Welcome to About page | batch 23</Card.Title>
                    <Card.Text>
                        Corporis laborum officia consequatur vero necessitatibus ut nisi. Qui laudantium ad vel. Tempora deserunt beatae id voluptatibus sapiente eaque.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}
