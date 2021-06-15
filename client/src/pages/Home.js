import {Container, Card} from 'react-bootstrap'

export default function Home() {
    const img = 'https://images.pexels.com/photos/2682877/pexels-photo-2682877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    return (
        <Container>
            <Card style={{ width: '60%' }} className="mx-auto mt-5 shadow">
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>Welcome to homepage</Card.Title>
                    <Card.Text>
                        Perferendis dolore aliquam. Voluptas velit asperiores esse architecto ad neque quod. In fuga nesciunt. Excepturi voluptas pariatur quo necessitatibus. Omnis sint nobis minus.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}
