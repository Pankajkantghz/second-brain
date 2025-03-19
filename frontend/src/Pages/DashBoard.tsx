import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import CreateContentModel from '../components/CreateContentModel';
import { Button } from '../components/Button';
import Card from '../components/Card';
import PlusIcon from '../icons/PlusIcon';
import ShareIcon from '../icons/ShareIcon';
import useContent from '../hooks/useContent';
import { Backend_URL } from '../config';
import axios from 'axios';

const DashBoard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, refresh } = useContent(); // Use contents, not content

    useEffect(() => {
        refresh();
    }, [modalOpen]);

    const handleShare = async () => {
        try {
            const response = await axios.post(`${Backend_URL}/api/v1/brain/share`, {
                share: true,
            }, {
                headers: { 
                    "Authorization": localStorage.getItem("token")
                },
            });
            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            alert(`Shared URL: ${shareUrl}`); // Display the URL in an alert
        } catch (error) {
            console.error('Error sharing brain:', error);
        }
    };

    return (
        <div>
            <Sidebar />

            <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
                <CreateContentModel open={modalOpen} onClose={() => setModalOpen(false)} />

                <div className="flex justify-end gap-2">
                    <Button
                        onClick={() => setModalOpen(true)}
                        variant="primary"
                        text="Add Content"
                        startIcon={<PlusIcon />}
                    />
                    <Button
                        onClick={handleShare}
                        variant="secondary"
                        text="Share Brain"
                        startIcon={<ShareIcon />}
                    />
                </div>

                <div className="flex gap-4 flex-wrap">
                    {contents.map(({ link, type, title }) => (
                        <Card key={link} type={type} link={link} title={title} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
