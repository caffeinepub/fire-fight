import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import List "mo:core/List";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Position = {
    x : Int;
    y : Int;
  };

  type PlayerStats = {
    health : Nat;
    wins : Nat;
    losses : Nat;
  };

  type PlayerProfile = {
    principal : Principal;
    score : Nat;
  };

  type GameRoom = {
    id : Nat;
    players : List.List<Principal>;
    isActive : Bool;
  };

  module PlayerProfile {
    public func compare(profile1 : PlayerProfile, profile2 : PlayerProfile) : Order.Order {
      Nat.compare(profile2.score, profile1.score);
    };
  };

  let gameRooms = Map.empty<Nat, GameRoom>();
  var nextRoomId = 0;

  let playerStats = Map.empty<Principal, PlayerStats>();

  type UserProfile = {
    name : Text;
  };

  let accessControlState = AccessControl.initState();
  let userProfiles = Map.empty<Principal, UserProfile>();
  include MixinAuthorization(accessControlState);

  public shared ({ caller }) func setPosition(_ : Position) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can move");
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createGameRoom() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create game rooms");
    };

    let roomId = nextRoomId;
    nextRoomId += 1;

    let newRoom : GameRoom = {
      id = roomId;
      players = List.empty<Principal>();
      isActive = true;
    };

    gameRooms.add(roomId, newRoom);
    roomId;
  };

  public shared ({ caller }) func joinGameRoom(roomId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can join game rooms");
    };

    switch (gameRooms.get(roomId)) {
      case (null) {
        Runtime.trap("Game room does not exist");
      };
      case (?room) {
        if (not room.isActive) {
          Runtime.trap("Game room is no longer active");
        };
        room.players.add(caller);
      };
    };
  };

  public query func getLeaderboard() : async [PlayerProfile] {
    let profiles = playerStats.toArray().map(
      func(entry) {
        let (principal, stats) = entry;
        {
          principal;
          score = stats.wins;
        };
      }
    );

    profiles.sort();
  };
};
