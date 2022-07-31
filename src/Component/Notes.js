import React, { Fragment, useEffect, useState } from 'react'

export default function Notes() {
    const [isDataAvalible, setIsDataAvalible] = useState((localStorage.getItem('dbtnotesApp') ? localStorage.getItem('dbtnotesApp').length > 2 : false));
    let [oldData, setOldData] = useState(JSON.parse(localStorage.getItem('dbtnotesApp')) || []);
    const [addnew, setAddnew] = useState(false);
    let [obj, setObj] = useState({
        title: '',
        notes: '',
        date: '',
        id: ''
    });

    function changeClass(val) {
        let todayDate = getDate();
        if (val === false) {
            oldData = JSON.parse(localStorage.getItem('dbtnotesApp')) || [];
            oldData.push(obj);
            obj.date = todayDate;
            obj.id = todayDate + Math.random();
            setIsDataAvalible(true);
            localStorage.setItem('dbtnotesApp', JSON.stringify(oldData));
            setObj({
                title: '',
                notes: '',
                date: '',
                id: ''
            })
            setOldData(JSON.parse(localStorage.getItem('dbtnotesApp')) || []);
        }
        setAddnew(val);
    }

    function getDate() {
        let today = new Date().toLocaleDateString()
        return today;
    }

    function setText(text) {
        setObj({
            title: text,
            notes: obj.notes
        })

    }

    function setNotes(notes) {
        setObj({
            title: obj.title,
            notes: notes
        })
    }

    function handleDelete(id) {
        oldData = JSON.parse(localStorage.getItem('dbtnotesApp')) || [];
        oldData = oldData.filter((m) => (m.id !== id));
        localStorage.setItem('dbtnotesApp', JSON.stringify(oldData));
        setOldData(JSON.parse(localStorage.getItem('dbtnotesApp')) || []);
        isDataAvalible((localStorage.getItem('dbtnotesApp').length > 0));
    }

    return (
        <Fragment>

            <div className="createBtn" onClick={() => changeClass(true)}>
                <center>
                    <h2>
                        <i className="fas fa-plus"></i>
                        <h4>New Task</h4>
                    </h2>
                </center>
            </div>
            {
                isDataAvalible === false ?
                    <div className='emptynotes-container'>
                        <h1>Let's Create Note</h1>
                    </div>
                    :
                    <div className='notes-container'>
                        {
                            oldData.map((noteObj) => (
                                <div className='notes' id={noteObj.id}>
                                    <div className='title-date'>
                                        <span>{noteObj.title}</span>
                                        <span>{noteObj.date}</span>
                                        <span><i className='far fa-trash-alt delete-btn' style={{ color: 'red' }} onClick={() => handleDelete(noteObj.id)}></i></span>
                                    </div>
                                    <div className='notes-content'>{noteObj.notes}</div>
                                </div>
                            ))
                        }
                    </div>
            }
            {
                addnew === true ?
                    <div className='input-data'>
                        <div>
                            <input type='text' className='text-i' placeholder='Enter Title' value={obj.title} onChange={(e) => setText(e.target.value)} ></input>
                            <div className='textArea'>
                                <textarea className='textarea-i' placeholder='Enter Text' value={obj.notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                            </div>
                            <button className='text-i save-btn' onClick={() => changeClass(false)}>Save Now</button>
                        </div>
                    </div>
                    :
                    <div style={{ position: "absolute", display: 'none' }}></div>
            }
        </Fragment >
    )
}
