import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { get, post } from '@/utils/request';


interface IProps {
      track: ITrackTop | null;
}
const LikeTrack = (props: IProps) => {
      const { track } = props;
      const { data: session } = useSession();
      const router = useRouter();

      const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>(null);
      const fetchData = async () => {
            const res = await get<ITrackLike[]>(`likes?user=${session?.user._id}`)
            setTrackLikes(res)
      }
      useEffect(() => {
            fetchData();
      }, [session])
      const handleLikeTrack = async () => {
            const randomId = Math.random().toString(36).substring(2) + Date.now().toString(7);
            await post<ITrackLike>('likes', {
                  id: randomId,
                  user: session?.user._id,
                  track: track?.id
            })
            fetchData()
            router.refresh()
      }

      return (
            <div style={{ margin: "20px 10px 0 10px", display: "flex", justifyContent: "space-between" }}>
                  <Chip
                        onClick={() => handleLikeTrack()}
                        sx={{ borderRadius: "5px" }}
                        size="medium"
                        variant="outlined"
                        color={trackLikes?.some(t => t.id === track?.id) ? "error" : "default"}
                        clickable
                        icon={<FavoriteIcon />} label="Like"
                  />
                  <div style={{ display: "flex", width: "100px", gap: "20px", color: "#999" }}>
                        <span style={{ display: "flex", alignItems: "center" }}><PlayArrowIcon sx={{ fontSize: "20px" }} /> {track?.countPlay}</span>
                        <span style={{ display: "flex", alignItems: "center" }}><FavoriteIcon sx={{ fontSize: "20px" }} /> {track?.countLike}</span>
                  </div>
            </div>
      )
}

export default LikeTrack;