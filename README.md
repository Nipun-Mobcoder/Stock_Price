# Kafka

Kafka is an open-source, distributed event-streaming platform used to build real-time data pipelines and applications. It is designed for high throughput, low latency, and scalable data streaming, enabling systems to produce, process, and consume streams of events in a fault-tolerant manner.

Kafka acts as a bridge between producers and consumers, allowing them to function independently. It stores data on disk in a distributed manner with replication to ensure data safety even in case of node failures.

---

## **Key Concepts in Kafka**

### **Topic**
- A **topic** is a category where messages are published by producers.
- Each topic is divided into **partitions** for parallelism.
- A partition is an ordered, immutable sequence of messages.

### **Producers**
- **Producers** are clients or applications that publish (write) messages to Kafka topics.
- Producers can choose which partition to write to.

### **Consumers**
- **Consumers** are clients or applications that read messages from Kafka topics.
- A **consumer group** is a set of consumers sharing a common group ID.
- Each partition is assigned to a consumer within a consumer group, enabling parallel processing.

### **Brokers**
- A **broker** is a Kafka server that stores data and serves producer/consumer requests.
- A Kafka cluster consists of multiple brokers working together.

### **Offset**
- An **offset** is a unique identifier for a message in a partition.
- Consumers use offsets to track which messages they have already read.

---

## **Zookeeper in Kafka**
Zookeeper plays a crucial role in managing and coordinating Kafka clusters:

- **Broker Coordination**: Helps in managing Kafka brokers.
- **Leader Election**: Handles leader election for partitions.
- **Metadata Storage**: Maintains information about topics, partitions, and brokers.
- **Partition Assignment**: Ensures proper partition assignment to brokers.
- **High Availability and Fault Tolerance**: Ensures the Kafka cluster remains operational during failures.

---

## **Topic Replication**
- **Replication Factor**: The number of copies of data across multiple brokers. It should always be greater than 1 (e.g., 2 or 3).
- Replication ensures data availability even during broker failures.

### **Example**
- **3 Brokers**, **1 Topic**, **2 Partitions**, and **2 Replications**:
  - Partition 0 exists in **Broker 101**, with a replica in **Broker 102**.
  - Partition 1 exists in **Broker 102**, with a replica in **Broker 103**.
![Alt Text](https://miro.medium.com/v2/resize:fit:720/format:webp/0*EX6DLd047At-s1K_ "Optional Title")
---

## **Leader for a Partition**
- Each partition has one server acting as the **leader**.
  - The leader handles all read and write requests for the partition.
  - Followers passively synchronize data from the leader.
![Alt Text](https://miro.medium.com/v2/resize:fit:720/format:webp/0*Ix_AsBvAckglNQ2J  "Optional Title")

### **Leader Failover**
- If a leader fails, one of the followers automatically becomes the new leader.
- When a broker recovers, it can regain its role as a leader.
![Alt Text](https://miro.medium.com/v2/resize:fit:720/format:webp/0*zSzUmFCEisF0wEz4  "Optional Title")
---

## **Consumers and Consumer Groups**
- A **consumer** is a client process that reads records from a Kafka topic.
- Consumers automatically know which broker and partition to read from.
- In case of broker failures, consumers recover automatically.

### **Consumer Groups**
- Kafka consumers are divided into **consumer groups**.
- Multiple consumers in the same group divide the partitions of a topic amongst themselves, ensuring parallel consumption.
- Each consumer within a group receives messages from a different subset of the topic’s partitions.

---

## **Conclusion**
Kafka’s architecture ensures high performance, scalability, and fault tolerance, making it a powerful choice for building real-time data pipelines and event-driven applications. With its ability to handle massive amounts of data and ensure high availability, Kafka has become an essential tool for modern distributed systems.
