import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, PlayerProfile } from '../backend';
import { toast } from 'sonner';

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useCreateGameRoom() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.createGameRoom();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameRooms'] });
      toast.success('Game room created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create game room:', error);
      toast.error('Failed to create game room');
    },
  });
}

export function useJoinGameRoom() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roomId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.joinGameRoom(roomId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameRooms'] });
      toast.success('Joined game room!');
    },
    onError: (error) => {
      console.error('Failed to join game room:', error);
      toast.error('Failed to join game room');
    },
  });
}

export function useGetLeaderboard() {
  const { actor, isFetching } = useActor();

  return useQuery<PlayerProfile[]>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetPosition() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (position: { x: bigint; y: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setPosition(position);
    },
    onError: (error) => {
      console.error('Failed to set position:', error);
      toast.error('Failed to move');
    },
  });
}
