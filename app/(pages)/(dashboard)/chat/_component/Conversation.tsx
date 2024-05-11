'use client';
import { getUserDetailsById } from '@/app/services/vendor';
import React, { useEffect, useState } from 'react';

const Conversation = ({
    conversation,
    currentUser,
}: {
    conversation: any;
    currentUser: string | undefined;
}) => {
    const [user, setUser] = useState();
    useEffect(() => {
        const userId = conversation.members.find(
            (memeberId: string) => memeberId !== currentUser
        );
        const fetchUserDetails = async () => {
            const { status, message, data } = await getUserDetailsById(userId);
            if (status !== 200) {
                return;
            }
            console.log(data);

            setUser(data);
        };
        fetchUserDetails();
    }, []);
    return <div>Conversation</div>;
};

export default Conversation;
