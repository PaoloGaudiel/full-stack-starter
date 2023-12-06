import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoInput from './Components/PhotoInput';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function IdolForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        stageName: '',
        groupName: '',
        legalName: '',
        portraitUrl: '',
    });

    const [isConfirmDeleteShowing, setConfirmDeleteShowing] = useState(false);

    useEffect(() => {
        if(id) {
            fetch(`/api/idols/${id}`)
                .then((response) => response.json())
                .then((json) => setData(json));
        }
    }, [id]);

    function onChange(event) {
        const newData = { ...data };
        newData[event.target.name] = event.target.value;
        setData(newData);
    }

    async function onSubmit(event) {
        event.preventDefault();
        try {
            let path = '/api/idols';
            let method = 'POST'
            if (id) {
                path = `/api/idols/${id}`;
                method = 'PATCH';
            }
            const response = await fetch(path, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            console.log(json);
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    }

    function showConfirmDeleteModal() {
        setConfirmDeleteShowing(true);
    }

    function handleClose() {
        setConfirmDeleteShowing(false);
    }

    async function onDelete() {
        handleClose();
        try {
            await fetch(`/api/idols/${id}`, {
                method: 'DELETE',
                headers: {
                        'Content-Type': 'application/json'
                },
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h1>Idol Form</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="stageName">Stage Name</label>
                    <input type="text" id="stageName" name="stageName" value={data.stageName} 
                        onChange={onChange}
                        className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="groupName">Group Name</label>
                    <input type="text" id="groupName" name="groupName" value={data.groupName} 
                        onChange={onChange}
                        className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="legalName">Legal Name</label>
                    <input type="text" id="legalName" name="legalName" value={data.legalName} 
                        onChange={onChange}
                        className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="portrait">Portrait</label>
                    <PhotoInput id="portrait" name="portrait"
                                value={data.portrait} valueUrl={data.portraitUrl}
                                onChange={onChange}
                                className="card">
                        <div className="card-body">
                            Click here or drag-and-drop here.
                        </div>
                    </PhotoInput>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {id && <button onClick={showConfirmDeleteModal} type="button" className="btn btn-danger">Delete</button>}
                </div>
                <Modal centered show={isConfirmDeleteShowing} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Confirm Idol Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you'd like to delete this idol?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                        Confirm Delete
                    </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </div>
    );
}

export default IdolForm;