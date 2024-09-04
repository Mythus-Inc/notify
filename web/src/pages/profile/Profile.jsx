import React from 'react';
import './Profile.css';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';


const ProfileCard = () => {


    return (    
        <div className="container">
            <Card className="profile-card">
                <div className="profile-header">
                    <Avatar image="/images/profile-picture.png" size="xlarge" shape="circle" className="profile-avatar" />
                    <div className="profile-info">
                        <h2>Nome Completo do Servidor</h2>
                        <p>SIAPE: 00000000</p>
                        <div className="functions">
                            <Tag className="function-tag" severity="info" value="Função 1" />
                            <Tag className="function-tag" severity="success" value="Função 2" />
                            <Tag className="function-tag" severity="warning" value="Função 3" />
                            <Tag className="function-tag" severity="danger" value="Função 4" />
                        </div>
                    </div>
                </div>

                <Divider/>

                <div className="p-d-flex p-flex-wrap">
                    <div className="profile-details p-mr-3">
                        <div className="detail-item">
                            <strong>Cargo</strong>
                            <p>CargoDoServidor</p>
                        </div>
                        <div className="detail-item">
                            <strong>CPF</strong>
                            <p>000.000.000-00</p>
                        </div>
                        <div className="detail-item">
                            <strong>Telefone</strong>
                            <p>(00) 00000-0000</p>
                        </div>
                        <div className="detail-item">
                            <strong>E-Mail</strong>
                            <p>EmailDoServidor@ifpr.edu.br</p>
                        </div>
                    </div>
                    <Divider layout='vertical' />
                    <div className="communications p-mr-3">
                        <h3>Últimos Comunicados:</h3>
                        <div className="communication-item">
                            <h4>Título do Comunicado nº1</h4>
                            <p>Para: Todos</p>
                            <p>Data: 08/08/2024</p>
                            <p>DescriçãoDoComunicado...</p>
                        </div>
                        <div className="communication-item">
                            <h4>Título do Comunicado nº2</h4>
                            <p>Para: 1º Ano</p>
                            <p>Data: 22/08/2024</p>
                            <p>DescriçãoDoComunicado...</p>
                        </div>
                        <Button label="Ver Todos" className="p-button-link" />
                    </div>
                </div>
                <Divider />
                <div className="profile-footer">
                    <Button label="Alterar Senha" className="p-button-danger" />
                    <Button label="Editar Perfil" className="p-button-primary" />
                </div>
            </Card>
        </div>

    );
};

export default ProfileCard;
