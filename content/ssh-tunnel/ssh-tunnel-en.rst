#########################################
SSH Tunneling (Port Forwarding) Explained
#########################################

:date: 2020-05-21
:slug: ssh-tunneling
:modified: 2020-05-25
:category: SSH, Linux
:tags: SSH, Linux, Tunneling, Port Forwarding
:summary: Explained how to use SSL Local Port Forwarding, Remote Port
          Forwarding, and Dynamic Port Forwarding to create an encrypted
          tunnel between two network endpoints.
:lang: en

I've recently started to research how to use SSH Tunneling to connect myself to
an internal network. It's hard to grasp the idea of the network topology I'm
dealing with and the SSH command I should use, but then realize it's such a
powerful tool that would help solve different kinds of tunneling issues. Hope
this article could help you to understand how powerful SSH tunneling it is.
Let's get started!


****************************************
What is SSH Tunneling (Port Forwarding)?
****************************************

*Tunneling* means creating a "tunnel" in a certain way to connect two endpoints
on a network so that the communication between the two can bypass some
restrictions (e.g., a firewall) or can be encrypted to prevent eavesdropping.
SSH Tunneling simply means using SSH protocol to create the tunnel. Not only it
encrypts the communication, if there's a firewall blocking the connection for
certain ports (e.g., 80/443 of HTTP/HTTPS) but not the SSH port (22), we could
disguise the communication as a regular SSH connection and not blocked by the
firewall.

After the tunnel is established, the data transmission looks just like
forwarding the data from *port X on endpoint A* to *port Y on endpoint B*, it's
also called SSH Port Forwarding.

.. image:: {static}images/tunneling_en.png
   :alt: Tunneling

SSH Port Forwarding has three modes：

- Local Port Forwarding
- Remote Port Forwarding
- Dynamic Port Forwarding

I will explain all of them in this article. First, we need to know the roles in
SSH Port Forwarding.

***************************
Roles in SSH Port Fowarding
***************************

For Local and Remote port forwarding, they all have the three roles:

Client
    - Any computer you can type ``ssh`` command to initiate the SSH connection

SSH Server
    - Any computer that can be connected by **Client** using SSH

Target Server
    - A computer you want to connect to, usually because you want to publish
      some service running on it
    - **Note**: Both **Client** and **SSH Server** can be **Target Server**,
      not that it really needs three computers to start the Port Forwarding!

Dynamic Port Forwarding is different in that after the Port Forwarding is
created, you can dynamically pick which Target Server you want to connect.

Now we know what the roles are, let's first dive into *Local Port Forwarding*.

*********************
Local Port Forwarding
*********************

Syntax
======

.. code-block:: general

   ssh -L [bind_address:]<port>:<host>:<host_port> <SSH Server>

Listening to ``bind_address:port`` on the **Client**, and after connection
established, forwards all the data to ``host:host_port``.
**Note**: The address ``host`` is relative to **SSH Server**, not **Client**!

Scenario 1: Connect to a service on a development server behind firewall
========================================================================

You have a service listens to port 8080 running on a development server behind
a firewall. The firewall blocks all the connections except SSH (port 22), which
means you can't connect to port 8080 from your computer, but you really want to
access the service...

.. image:: {static}images/local_scenario1_problem_en.png
   :alt: Scenario 1 diagram

Not a problem. As long as you can SSH to the development server, we can use
Local Port Forwarding to open a port on your computer (assume to be 9090) and
forwards all the data sent to it to port 8080 on the development server.
Connecting port 9090 on your computer is just like connecting to port 8080 on
the development server.

.. image:: {static}images/local_scenario1_solved_en.png
   :alt: Solution to Scenario 1 diagram

Client
    - Your computer

SSH Server
    - Development server behind firewall
    - SSH Destination： ``johnliu@my-server``

Target Server
    - Development server behind firewall

SSH Command:

.. code-block:: general

   ssh -L 9090:localhost:8080 johnliu@my-server

The ``localhost`` here is relative to ``johnliu@my-server``, which is the
development server itself.

.. note::

    - You can totally use the same port on your computer for Port Forwarding.
      I use ``9090`` just to avoid confusion:

      .. code-block:: general

          ssh -L 8080:localhost:8080 johnliu@my-server

    - If you didn't specify ``bind_address``, by default it will bind to
      ``localhost``. If you want to open it for everyone to connect:

      .. code-block:: general

          ssh -L 0.0.0.0:9090:localhost:8080 johnliu@my-server
