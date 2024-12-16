import React, { useState } from 'react';
import {
      Box,
      Typography,
      Avatar,
      TextField,
      Button,
      Paper,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { post } from '@/utils/request';

interface IProps {
      comments: ITrackComment[];
      track: ITrackTop | null;
}
const CommentTrack = (props: IProps) => {
      const router = useRouter();
      const { comments, track } = props;
      const [yourComment, setYourComment] = useState("");
      const { data: session } = useSession();
      const formatDateTime = (timestamp: string) => {
            const now = new Date();
            const commentDate = new Date(timestamp);
            const diffInMinutes = Math.floor((now.getTime() - commentDate.getTime()) / (1000 * 60));

            if (diffInMinutes < 1) return 'Vừa xong';
            if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) return `${diffInHours} giờ trước`;

            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 7) return `${diffInDays} ngày trước`;

            const day = commentDate.getDate().toString().padStart(2, '0');
            const month = (commentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = commentDate.getFullYear();
            const hours = commentDate.getHours().toString().padStart(2, '0');
            const minutes = commentDate.getMinutes().toString().padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
      }

      const handleSubmit = async () => {
            const randomId = Math.random().toString(36).substring(2) + Date.now().toString(7);

            const newComment = {
                  id: randomId,
                  content: yourComment,
                  moment: new Date().toISOString(),
                  user: session?.user._id,
                  track: track?.id
            };
            await post<ITrackComment>('comments', newComment)
            setYourComment('')
            router.refresh()
      }

      return (
            <Box sx={{ padding: 2, margin: '0 auto', marginBottom: '50px' }}>
                  {session?.user._id && (
                        <Paper
                              elevation={0}
                              sx={{
                                    p: 2,
                                    mb: 3,
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: 2
                              }}
                        >
                              <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: '#1976d2' }}>U</Avatar>
                                    <TextField
                                          fullWidth
                                          rows={2}
                                          onChange={(e) => setYourComment(e.target.value)}
                                          label="Comments" variant="standard"
                                          onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                      handleSubmit()
                                                }
                                          }}
                                          placeholder="Viết bình luận..."
                                          sx={{
                                                '& .MuiOutlinedInput-root': {
                                                      borderRadius: 2,
                                                      backgroundColor: 'white',
                                                }
                                          }}
                                    />
                              </Box>
                              {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                              <Button
                                    variant="contained"
                                    sx={{
                                          borderRadius: 2,
                                          textTransform: 'none',
                                          px: 3
                                    }}
                                    onClick={handleSubmit}
                              >
                                    Đăng
                              </Button>
                        </Box> */}
                        </Paper>
                  )}


                  {comments.map((comment) => (
                        <Box
                              key={comment.id}
                              sx={{
                                    display: 'flex',
                                    gap: 2,
                                    mb: 2
                              }}
                        >
                              <Avatar sx={{ bgcolor: '#e91e63' }}></Avatar>
                              <Box>
                                    <Box sx={{
                                          backgroundColor: '#f8f9fa',
                                          p: 2,
                                          borderRadius: 2,
                                          mb: 0.5
                                    }}>
                                          <Typography
                                                variant="subtitle2"
                                                sx={{
                                                      fontWeight: 'bold',
                                                      mb: 0.5
                                                }}
                                          >
                                                {comment.user}
                                          </Typography>
                                          <Typography variant="body2">
                                                {comment.content}
                                          </Typography>
                                    </Box>
                                    <Typography
                                          variant="caption"
                                          color="text.secondary"
                                          sx={{ ml: 1 }}
                                    >
                                          {formatDateTime(comment.moment)}
                                    </Typography>
                              </Box>
                        </Box>
                  ))}
            </Box>
      );
}
export default CommentTrack