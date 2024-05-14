'use client';
import { getUserDetailsById } from '@/app/services/vendor';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Conversation = ({
    conversation,
    currentUser,
}: {
    conversation: any;
    currentUser: string | undefined;
}) => {
    const [user, setUser] = useState<any>();
    useEffect(() => {
        const userId = conversation.members.find(
            (memeberId: string) => memeberId !== currentUser
        );
        const fetchUserDetails = async () => {
            const { status, message, data } = await getUserDetailsById(userId);
            if (status !== 200) {
                return;
            }

            setUser(data);
        };
        fetchUserDetails();
    }, []);
    return (
        <>
            {' '}
            <div className="m-4 cursor-pointer">
                {user && (
                    <div className="flex items-center text-sm gap-2">
                        <Avatar>
                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-medium truncate">{user.username}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Conversation;
