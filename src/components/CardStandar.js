import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Col
} from "reactstrap";

class CardStandar extends Component{

    render() {

        return (
            <>
                    <Col
                        className={this.props.class}
                        lg={this.props.colLg} md={this.props.colMd} sm={this.props.colSm} xs={this.props.colXs}
                    
                    >
                        
                        <Card
                        className={this.props.carClass}
                                                
                        >
                            <CardHeader className="p-0">
                                {this.props.contenidoHeader}
                            </CardHeader>

                            <CardBody>
                                {this.props.contenidoBody}
                            </CardBody>

                        </Card>

                    </Col>

            </>
        );

    }

}

export default CardStandar;