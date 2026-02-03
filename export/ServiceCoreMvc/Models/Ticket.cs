namespace ServiceCore.Models
{
    public class Ticket
    {
        public string Id { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string Requester { get; set; } = string.Empty;
        public string Assigned { get; set; } = string.Empty;
        public string Updated { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
    }
}
