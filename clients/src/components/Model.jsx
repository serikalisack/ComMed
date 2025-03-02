import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { useEffect } from 'react';
import { searchUsers } from '../apis/auth';
import { addToGroup, removeUser, renameGroup } from '../apis/chat';
import { fetchChats } from '../redux/chatsSlice';
import Search from './group/Search';
import { getChatName, getChatPhoto } from '../utils/logics';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "fit-content",
  bgcolor: '#1a1d24',
  boxShadow: 24,
  p: 2,
  borderRadius: '8px',
  color: '#f0f0f0',
};

function Model(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const { activeChat } = useSelector((state) => state.chats);
  const activeUser = useSelector((state) => state.activeUser);

  const handleOpen = () => {
    setOpen(true);
    setName(getChatName(activeChat, activeUser));
  };

  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setSearchResults([]);
  };

  const handleClick = async (e) => {
    if (members.includes(e)) return;
    await addToGroup({ userId: e?._id, chatId: activeChat?._id });
    setMembers([...members, e]);
  };

  const updateBtn = async () => {
    if (name) {
      let data = await renameGroup({ chatId: activeChat._id, chatName: name });
      if (data) {
        dispatch(fetchChats());
        setOpen(false);
      }
    }
    setOpen(false);
  };

  const deleteSelected = async (ele) => {
    const res = await removeUser({ chatId: activeChat._id, userId: ele._id });
    if (res._id) {
      setMembers(members.filter((e) => e._id !== ele._id));
      dispatch(fetchChats());
      setOpen(false);
    }
    return;
  };

  const leaveGroup = async () => {
    const res = await removeUser({ chatId: activeChat._id, userId: activeUser.id });
    if (res._id) {
      dispatch(fetchChats());
      setOpen(false);
    }
    return;
  };

  useEffect(() => {
    setMembers(activeChat?.users.map((e) => e));
  }, [activeChat]);

  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true);
      const { data } = await searchUsers(search);
      setSearchResults(data);
      setIsLoading(false);
    };
    searchChange();
  }, [search]);

  return (
    <>
      <button onClick={handleOpen}>
        <img className='w-[40px] h-[40px] rounded-[25px]' alt="Profile Pic" src={getChatPhoto(activeChat, activeUser)} />
      </button>
      {activeChat?.isGroup ? (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <h5 className='text-[22px] font-semibold tracking-wide text-center'>{getChatName(activeChat, activeUser)}</h5>
            <div>
              <h6 className='text-[14px] tracking-wide font-semibold'>Members</h6>
              <div className='flex flex-wrap gap-y-2'>
                {members.length > 0 &&
                  members?.map((e) => (
                    <button
                      key={e}
                      className='flex items-center gap-x-1 bg-[#FFD700] text-[#1a1d24] text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-[#FFD700]'
                    >
                      <span className='text-[10px]'>{e._id === activeUser.id ? "You" : e.name}</span>
                      <RxCross2 onClick={() => deleteSelected(e)} />
                    </button>
                  ))}
              </div>
              <div>
                <form className='mt-5 flex flex-col gap-y-3' onSubmit={(e) => e.preventDefault()}>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="border-[#FFD700] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%] bg-[#1a1d24] text-[#f0f0f0] rounded-lg"
                    type="text"
                    name="chatName"
                    placeholder="Group Name"
                    required
                  />
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-[#FFD700] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%] bg-[#1a1d24] text-[#f0f0f0] rounded-lg"
                    type="text"
                    name="users"
                    placeholder="Add users"
                  />
                </form>
                <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />
                <div className='flex justify-end gap-x-3 mt-3'>
                  <button
                    onClick={updateBtn}
                    className='bg-[#FFD700] text-[#1a1d24] px-4 py-1 text-[10.6px] tracking-wide rounded-lg'
                  >
                    Update
                  </button>
                  <button
                    onClick={() => leaveGroup()}
                    className='bg-[#880808] text-[#f0f0f0] px-4 py-1 text-[10.6px] tracking-wide rounded-lg'
                  >
                    Leave
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      ) : (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <div className='w-[250px] h-[250px] flex flex-col items-center justify-center -mt-4'>
              <img className='w-[70px] h-[70px] rounded-[35px] shadow-lg' src={getChatPhoto(activeChat, activeUser)} alt="" />
              <h2 className='text-[17px] tracking-wider font-semibold'>{getChatName(activeChat, activeUser)}</h2>
              <h3 className='text-[14px] font-semibold text-[#FFD700]'>
                {!activeChat?.isGroup && activeChat?.users[0]?._id === activeUser.id
                  ? activeChat?.users[1]?.email
                  : activeChat?.users[0]?.email}
              </h3>
              <div className='flex flex-col items-start'>
                <h5 className='text-[13px]'>
                  {!activeChat?.isGroup && activeChat?.users[0]?._id === activeUser.id
                    ? activeChat?.users[1]?.bio
                    : activeChat?.users[0]?.bio}
                </h5>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default Model;