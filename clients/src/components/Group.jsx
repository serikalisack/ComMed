import React, { useState } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { Modal, Box } from "@mui/material";
import { searchUsers } from '../apis/auth';
import { RxCross2 } from "react-icons/rx";
import { useEffect } from 'react';
import { createGroup } from '../apis/chat';
import { fetchChats } from '../redux/chatsSlice';
import { useDispatch } from 'react-redux';
import Search from './group/Search';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: '#1a1d24',
  boxShadow: 24,
  p: 2,
  borderRadius: '8px',
  color: '#f0f0f0',
};

function Group() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUsers] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setSelectedUsers([]);
  };

  const handleFormSearch = async (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    if (selectedUser.includes(e)) return;
    setSelectedUsers([...selectedUser, e]);
  };

  const deleteSelected = (ele) => {
    setSelectedUsers(selectedUser.filter((e) => e._id !== ele._id));
  };

  const handleSubmit = async () => {
    if (selectedUser.length >= 2) {
      await createGroup({
        chatName,
        users: JSON.stringify(selectedUser.map((e) => e._id)),
      });
      dispatch(fetchChats());
      handleClose();
    }
  };

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
      <button className='mt-1 transition duration-150 ease-in-out' onClick={handleOpen}>
        <div className='flex justify-start border-r-2'>
          <button className='text-[11px] font-normal tracking-wide flex items-center gap-x-1 bg-[#FFD700] text-[#1a1d24] py-1 -mb-7 mt-2 px-2 rounded-lg'>
            New Group <BsPlusLg />
          </button>
        </div>
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h5 className='text-[18px] font-medium text-center'>Create A Group</h5>
          <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-y-3 mt-3'>
            <input
              onChange={(e) => setChatName(e.target.value)}
              className="border-[#FFD700] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%] bg-[#1a1d24] text-[#f0f0f0] rounded-lg"
              type="text"
              name="chatName"
              placeholder="Group Name"
              required
            />
            <input
              onChange={handleFormSearch}
              className="border-[#FFD700] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%] bg-[#1a1d24] text-[#f0f0f0] rounded-lg"
              type="text"
              name="users"
              placeholder="Add users"
            />
            <div className='flex -mt-2'>
              {selectedUser?.map((e) => (
                <button
                  key={e}
                  onClick={() => deleteSelected(e)}
                  className='flex items-center gap-x-1 bg-[#FFD700] text-[#1a1d24] text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-[#FFD700]'
                >
                  <span>{e.name}</span>
                  <RxCross2 />
                </button>
              ))}
            </div>
            <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />
            <div className='flex justify-end mt-3'>
              <button
                onClick={handleSubmit}
                className='bg-[#FFD700] text-[#1a1d24] text-[15px] font-medium px-2 py-1 tracking-wide rounded-lg'
                type='submit'
              >
                Create
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Group;