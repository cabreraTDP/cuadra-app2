import React from 'react'

const style = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '20px',
    width: '80%',
    maxWidth: '600px',
    overflow: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {},
  btn: {
    marginRight: '10px',
    height: '28px',
  },
  title: {
    marginLeft: '10px',
  },
}

export const Modal = ({ open, setOpen, children, title = 'Modal' }) => {
  return (
    <div>
      {open ? (
        <div style={style.modal}>
          <div style={style.content}>
            <div style={style.header}>
              <div style={style.title}>
                <h2>{title}</h2>
              </div>
              <button style={style.btn} onClick={() => setOpen(false)}>
                X
              </button>
            </div>
            <hr></hr>
            <div style={style.body}>{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
