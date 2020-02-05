<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\PostRequest\PostRequest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AppController extends AbstractController
{
    /**
     * @Route("/", name="app")
     */
    public function index()
    {
        return $this->render('base.html.twig');
    }

    /**
     * @Route("/api/register", name="register", methods={"POST"})
     */
    public function register(Request $request, PostRequest $postRequest, UserPasswordEncoderInterface $encoder, SerializerInterface $serializer, JWTTokenManagerInterface $jwtManager)
    {
        $data = $postRequest->getData($request);

        $user = new User();
        $user->setEmail($data->get('username'));
        $user->setPassword($encoder->encodePassword($user, $data->get('password')));
        $user->setRoles($data->has('roles') ? $data->get('roles') : ['ROLE_USER']);
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        $token = $jwtManager->create($user);
        return JsonResponse::fromJsonString($serializer->serialize(['token' => $token], 'json'));
    }


}
