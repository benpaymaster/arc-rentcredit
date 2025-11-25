// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title OptimisticDemocracy
 * @dev Consensus/dispute module for optimistic resolution with voting
 */
contract OptimisticDemocracy {
    enum DisputeStatus {
        None,
        Raised,
        Voting,
        Resolved,
        Appealed,
        Finalized
    }
    struct Dispute {
        address proposer;
        string description;
        uint256 challengeDeadline;
        uint256 votesFor;
        uint256 votesAgainst;
        DisputeStatus status;
        mapping(address => bool) hasVoted;
        // DAO/Appeal logic
        uint256 appealFee;
        bool appealed;
        uint256 daoVoteDeadline;
        mapping(address => bool) daoHasVoted;
        uint256 daoVotesFor;
        uint256 daoVotesAgainst;
        bool finalOutcome;
    }

    uint256 public challengePeriod;
    address[] public voters;
    mapping(uint256 => Dispute) public disputes;
    uint256 public disputeCount;
    event DisputeRaised(
        uint256 indexed disputeId,
        address indexed proposer,
        string description
    );
    event VoteCast(
        uint256 indexed disputeId,
        address indexed voter,
        bool support
    );
    event DisputeResolved(uint256 indexed disputeId, bool outcome);
    event DisputeAppealed(
        uint256 indexed disputeId,
        address indexed appellant,
        uint256 fee
    );
    event DAOVoteCast(
        uint256 indexed disputeId,
        address indexed voter,
        bool support
    );
    event DAODecision(uint256 indexed disputeId, bool outcome);
    event DisputeFinalized(uint256 indexed disputeId, bool outcome);

    modifier onlyVoter() {
        bool isVoter = false;
        for (uint256 i = 0; i < voters.length; i++) {
            if (voters[i] == msg.sender) {
                isVoter = true;
                break;
            }
        }
        require(isVoter, "Not authorized");
        _;
    }

    constructor(address[] memory _voters, uint256 _challengePeriod) {
        voters = _voters;
        challengePeriod = _challengePeriod;
    }

    function raiseDispute(
        string calldata description
    ) external returns (uint256) {
        disputeCount++;
        Dispute storage d = disputes[disputeCount];
        d.proposer = msg.sender;
        d.description = description;
        d.challengeDeadline = block.timestamp + challengePeriod;
        d.status = DisputeStatus.Raised;
        d.appealFee = 0.01 ether; // Example appeal fee
        emit DisputeRaised(disputeCount, msg.sender, description);
        return disputeCount;
    }

    function vote(uint256 disputeId, bool support) external onlyVoter {
        Dispute storage d = disputes[disputeId];
        require(
            d.status == DisputeStatus.Raised ||
                d.status == DisputeStatus.Voting,
            "Invalid status"
        );
        require(
            block.timestamp <= d.challengeDeadline,
            "Challenge period ended"
        );
        require(!d.hasVoted[msg.sender], "Already voted");
        d.hasVoted[msg.sender] = true;
        if (support) {
            d.votesFor++;
        } else {
            d.votesAgainst++;
        }
        d.status = DisputeStatus.Voting;
        emit VoteCast(disputeId, msg.sender, support);
    }

    function finalize(uint256 disputeId) external {
        Dispute storage d = disputes[disputeId];
        require(
            block.timestamp > d.challengeDeadline,
            "Challenge period not ended"
        );
        require(
            d.status == DisputeStatus.Raised ||
                d.status == DisputeStatus.Voting,
            "Already resolved"
        );
        bool outcome = d.votesFor > d.votesAgainst;
        d.status = DisputeStatus.Resolved;
        d.finalOutcome = outcome;
        emit DisputeResolved(disputeId, outcome);
    }

    function appeal(uint256 disputeId) external payable {
        Dispute storage d = disputes[disputeId];
        require(d.status == DisputeStatus.Resolved, "Not resolved yet");
        require(!d.appealed, "Already appealed");
        require(msg.value >= d.appealFee, "Insufficient appeal fee");
        d.appealed = true;
        d.status = DisputeStatus.Appealed;
        d.daoVoteDeadline = block.timestamp + 7 days;
        emit DisputeAppealed(disputeId, msg.sender, msg.value);
    }

    function daoVote(uint256 disputeId, bool support) external onlyVoter {
        Dispute storage d = disputes[disputeId];
        require(d.status == DisputeStatus.Appealed, "Not in appeal");
        require(block.timestamp <= d.daoVoteDeadline, "DAO vote ended");
        require(!d.daoHasVoted[msg.sender], "Already voted");
        d.daoHasVoted[msg.sender] = true;
        if (support) {
            d.daoVotesFor++;
        } else {
            d.daoVotesAgainst++;
        }
        emit DAOVoteCast(disputeId, msg.sender, support);
    }

    function finalizeDAO(uint256 disputeId) external {
        Dispute storage d = disputes[disputeId];
        require(d.status == DisputeStatus.Appealed, "Not in appeal");
        require(block.timestamp > d.daoVoteDeadline, "DAO vote not ended");
        bool outcome = d.daoVotesFor > d.daoVotesAgainst;
        d.status = DisputeStatus.Finalized;
        d.finalOutcome = outcome;
        emit DAODecision(disputeId, outcome);
        emit DisputeFinalized(disputeId, outcome);
    }

    function getVoters() external view returns (address[] memory) {
        return voters;
    }

    function getDispute(
        uint256 disputeId
    )
        external
        view
        returns (
            address proposer,
            string memory description,
            uint256 challengeDeadline,
            uint256 votesFor,
            uint256 votesAgainst,
            DisputeStatus status,
            bool appealed,
            uint256 appealFee,
            uint256 daoVoteDeadline,
            uint256 daoVotesFor,
            uint256 daoVotesAgainst,
            bool finalOutcome
        )
    {
        Dispute storage d = disputes[disputeId];
        return (
            d.proposer,
            d.description,
            d.challengeDeadline,
            d.votesFor,
            d.votesAgainst,
            d.status,
            d.appealed,
            d.appealFee,
            d.daoVoteDeadline,
            d.daoVotesFor,
            d.daoVotesAgainst,
            d.finalOutcome
        );
    }
}
